# 📦 Amazon Profit Calculator Backend

A simple **Node.js + Express** backend for calculating product profit, ROI, and margin status from either **ASIN** or manual input.

---

## 🚀 Getting Started

### Install dependencies
```bash
npm install
```

### Start the server
```bash
npm start
```
By default, the server runs on:
```
http://localhost:5000
```

---

## 📡 API Documentation

### **POST** `/post/calculate-profit`
Calculates profit, ROI percentage, and margin status based on product details.

#### Request URL
```
POST http://localhost:5000/post/calculate-profit
```

---

### 📝 Request Body (JSON)

#### 1. Using ASIN
```json
{
  "type": "ASIN",
  "ASIN": "B08XYZ1234"
}
```
- **type**: `"ASIN"` — fetches data from local mock file.
- **ASIN**: A valid Amazon Standard Identification Number (10 alphanumeric characters).

---

#### 2. Manual Input
```json
{
  "type": "manual",
  "buyCost": 200,
  "estimatedSellingPrice": 300,
  "amazonFee": 3.5,
  "referralFeePercent": 15
}
```
- **type**: `"manual"` — manual input mode.
- **buyCost** *(required)*: Purchase cost of the product.
- **estimatedSellingPrice** *(required)*: Planned selling price.
- **amazonFee** *(optional)*: Default is `3.5` if not provided.
- **referralFeePercent** *(optional)*: Default is `15` if not provided.

---

## 📤 Response Example
```json
{
  "type": "manual",
  "ASIN": null,
  "title": "Manual Product",
  "buyCost": 200,
  "estimatedSellingPrice": 300,
  "amazonFee": 3.5,
  "referralFee": 45,
  "referralFeePercent": 15,
  "profit": 51.5,
  "roiPercent": 25.75,
  "marginStatus": "normal"
}
```

---

## 📊 Margin Status Rules
| ROI %           | Status   |
|-----------------|----------|
| ≥ good threshold | good     |
| ≥ normal threshold but less than good | normal   |
| ≤ 0 profit or ROI below normal | bad      |

---

## 🛠 Tech Stack
- Node.js
- Express.js
- Nodemon (dev)
- Local JSON mock data for ASIN mode

---

Built with ❤️
