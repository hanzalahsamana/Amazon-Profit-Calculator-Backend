const path = require("path");
const fs = require("fs");
const { isValidASINFormat } = require("../utils/validateASIN");
const {
  DEFAULT_AMAZON_FEE,
  ROI_THRESHOLDS,
  DEFAULT_REFERRAL_FEE_PERCENT,
} = require("../enums/calculatorEnums");

const calculateProfit = (req, res) => {
  try {
    const {
      type,
      ASIN,
      buyCost,
      estimatedSellingPrice,
      amazonFee,
      referralFeePercent,
    } = req.body || {};

    if (!["ASIN", "manual"].includes(type)) {
      return res
        .status(400)
        .json({ message: "Type must be 'ASIN' or 'manual'." });
    }

    let title,
      finalBuyCost,
      finalSellingPrice,
      finalAmazonFee,
      finalReferralFee,
      finalReferralFeePercent;

    if (type === "ASIN") {
      if (!ASIN) {
        return res
          .status(400)
          .json({ message: "ASIN is required for type ASIN." });
      }

      if (!isValidASINFormat(ASIN)) {
        return res.status(400).json({
          message: "Invalid ASIN format. Must be 10 characters: A-Z and 0-9.",
        });
      }

      // Load mock data
      const jsonPath = path.join(__dirname, "../json/mockSpPayload.json");
      let data;
      try {
        data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
      } catch {
        return res.status(500).json({ message: "Failed to read product data." });
      }

      const product = data[ASIN];
      if (!product) {
        return res
          .status(404)
          .json({ message: "Product not found for provided ASIN." });
      }

      title = product.title;
      finalBuyCost = product.buyCost;
      finalSellingPrice = product.estimatedSellingPrice;
    } else {
      if (buyCost == null || estimatedSellingPrice == null) {
        return res.status(400).json({
          message:
            "buyCost and estimatedSellingPrice are required for manual type.",
        });
      }

      title = "Manual Product";
      finalBuyCost = Number(buyCost);
      finalSellingPrice = Number(estimatedSellingPrice);
    }

    finalAmazonFee = amazonFee != null ? Number(amazonFee) : DEFAULT_AMAZON_FEE;

    finalReferralFeePercent =
      referralFeePercent != null
        ? Number(referralFeePercent)
        : DEFAULT_REFERRAL_FEE_PERCENT ; // default now also in %

    finalReferralFee = finalSellingPrice * (finalReferralFeePercent / 100);

    // Calculate profit
    const profit =
      finalSellingPrice - finalBuyCost - finalAmazonFee - finalReferralFee;

    // Calculate ROI %
    const roiPercent = (profit / finalBuyCost) * 100;

    // Determine status
    let marginStatus;
    if (roiPercent >= ROI_THRESHOLDS.good) {
      marginStatus = "good";
    } else if (roiPercent >= ROI_THRESHOLDS.normal) {
      marginStatus = "normal";
    } else if (profit <= 0 || roiPercent < ROI_THRESHOLDS.normal) {
      marginStatus = "bad";
    }

    // Send response
    res.json({
      type,
      ASIN: ASIN || null,
      title,
      buyCost: finalBuyCost,
      estimatedSellingPrice: finalSellingPrice,
      amazonFee: finalAmazonFee,
      referralFee: finalReferralFee,
      referralFeePercent: finalReferralFeePercent,
      profit,
      roiPercent,
      marginStatus,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An unexpected error occurred.", details: err.message });
  }
};

module.exports = { calculateProfit };
