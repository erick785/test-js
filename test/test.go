package main

import (
	"encoding/json"
	"fmt"
	"math/big"
)

func main() {

	type A struct {
		B  *big.Int `json:"test,string"`
		BB int64    `json:"test1,string"`
	}

	b, _ := new(big.Int).SetString("5999999999999999580200", 10)

	bytes, err := json.Marshal(&A{B: b, BB: 100000})

	fmt.Println("---->", string(bytes))
	fmt.Println("---->", err)

}
