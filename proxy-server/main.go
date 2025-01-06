package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

// Trade represents a trade event
type Trade struct {
	Symbol    string `json:"symbol"`
	TradeID   string `json:"tradeId"`
	Price     string `json:"price"`
	Size      string `json:"size"`
	Side      string `json:"side"`
	Timestamp int64  `json:"timestamp"`
}

// Message represents a message containing trade data
type Message struct {
	Topic  string  `json:"topic"`
	Symbol string  `json:"symbol"`
	Data   []Trade `json:"data"`
}

// Upgrader is used to upgrade HTTP connections to WebSocket connections
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var (
	rnd       = rand.New(rand.NewSource(time.Now().UnixNano()))
	symbols   = []string{"BTC_USDT", "ETH_USDT", "XRP_USDT", "ADA_USDT", "DOGE_USDT"}
	lastPrice = 50000.0
)

// generateMockTrade generates a mock trade with random data
func generateMockTrade(timestamp int64) Trade {
	priceChange := rnd.Float64()*20 - 10 // price change between -10 and +10
	lastPrice += priceChange
	return Trade{
		Symbol:    symbols[rnd.Intn(len(symbols))],
		TradeID:   strconv.Itoa(rnd.Intn(1000000)),
		Price:     strconv.FormatFloat(lastPrice, 'f', 2, 64),
		Size:      strconv.FormatFloat(0.01+rnd.Float64()*0.1, 'f', 4, 64),
		Side:      []string{"BUY", "SELL"}[rnd.Intn(2)],
		Timestamp: timestamp,
	}
}

// tradeStreamHandler handles WebSocket connections and streams trade data
func tradeStreamHandler(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to upgrade connection"})
		return
	}
	defer conn.Close()

	currentTime := time.Now().UnixMilli()

	for {
		trades := []Trade{}
		for i := 0; i < rnd.Intn(5)+1; i++ {
			trades = append(trades, generateMockTrade(currentTime))
		}

		message := Message{
			Topic:  "TRADE",
			Symbol: "MULTI", // Indicates multiple symbols
			Data:   trades,
		}

		msgBytes, _ := json.Marshal(message)
		if err := conn.WriteMessage(websocket.TextMessage, msgBytes); err != nil {
			break
		}

		currentTime += 60000 // advance 1 minute for each data set
		time.Sleep(1 * time.Second)
	}
}

func main() {
	r := gin.Default()

	r.GET("/ws/trades", tradeStreamHandler)

	r.Run(":8080") // default port
}
