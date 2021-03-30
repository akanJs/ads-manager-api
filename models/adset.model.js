import mongoose from 'mongoose';

const adsetCampaign = new mongoose.Schema({
  age: {
    type: String
  },
  gender: {
    type: String
  },
  interests: {
    type: [String]
  },
  countries: {
    type: [String]
  },
  cities: {
    type: [String]
  },
  following: {
    type: [Object]
  },
  followers: {
    type: [Object]
  }
});

const Adset = mongoose.model('Adset', adsetCampaign);

export { adsetCampaign, Adset };
