import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  campaign_name: {
    type: String,
    required: [1, 'campaign name is required']
  }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

export { campaignSchema, Campaign };

