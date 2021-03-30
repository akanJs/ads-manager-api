import mongoose from 'mongoose';
import moment from'moment';
import { v4 as uuidv4 } from 'uuid';

const adSchema = new mongoose.Schema({
  ad_id: {
    type: String,
    default: uuidv4()
  },
  campaign: {
    type: mongoose.Types.ObjectId,
    ref: 'Campaign'
  },
  adset: {
    type: mongoose.Types.ObjectId,
    ref: 'Adset'
  },
  adcontent: {
    type: mongoose.Types.ObjectId,
    ref: 'AdContent'
  },
  createdBy: {
    type: Object,
    required: [1, 'created by is required']
  },
  createdDate: {
    type: String,
    default: moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
  }
});

const Ad = mongoose.model('Ad', adSchema);

export { adSchema, Ad };

