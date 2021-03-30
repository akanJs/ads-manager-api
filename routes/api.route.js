// jshint esversion:8
import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Ad } from '../models/ads.model.js';
import { AdContent } from '../models/adcontent.model.js';
import { Adset } from '../models/adset.model.js';
import { Campaign } from '../models/campaign.model.js';

const router = Router();

const routes = () => {

  // Create ad endpoint
  router.route('/create-ad')
    .post(async (req, res) => {
      const {
        campaign_name,
        ad_set,
        ad_content
      } = req.body;

      console.log(ad_content);

      // validate data type
      if (typeof campaign_name !== 'string' || typeof ad_content !== 'object' || typeof ad_set !== 'object') {
        return res.json({
          status: false,
          error: 'data invalid'
        });
      }

      // validate null or undefined
      if ((campaign_name === null || campaign_name === undefined) || (ad_set === null || ad_set === undefined) || (ad_content === null || ad_content === undefined)) {
        return res.json({
          status: false,
          error: 'data invalid'
        });
      }

      // create ad data and store in db
      const campaign_data = { // campaign data config
        campaign_name
      };

      // Adset data config
      const adset_data = {};
      Object.entries(ad_set).forEach((item) => {
        const key = item[0];
        const value = item[1];
        console.log(value);
        adset_data[key] = value;
      });

      // ad content data config
      const adcontent_data = {};
      Object.entries(ad_content).forEach((item) => {
        const key = item[0];
        const value = item[1];
        adcontent_data[key] = value;
      });

      // Log adset and adcontent to console
      console.log('Adset Data: ', adset_data, 'Adcontent Data: ', adcontent_data);

      // validate adset and adcontent
      if (adcontent_data && adset_data) {
        if ((adcontent_data.isImage && adcontent_data.imagePath) || (adcontent_data.isVideo && adcontent_data.videoPath)) {
          if (adset_data.age || adset_data.gender || adset_data.interests || adset_data.countries
            || adset_data.cities || adset_data.following || adset_data.followers) {
            try {
              const campaign = await Campaign.create(campaign_data);
              const adset = await Adset.create(adset_data);
              const adcontent = await AdContent.create(adcontent_data);

              const user = {
                user_id: uuidv4(),
                username: 'jsDev',
                email: 'ukoakanowo98@gmail.com'
              };

              if (campaign && adset && adcontent) {
                const ad_data = {
                  campaign,
                  adset,
                  adcontent,
                  createdBy: user
                };
                const ad = await Ad.create(ad_data);
                if (ad) {
                  return res.status(201).json({
                    status: true,
                    message: 'ad created successfully',
                    ad
                  });
                }
              }
            } catch (err) {
              return res.status(500).json({
                status: false,
                error: err
              });
            }
          }
          return res.json({
            status: false,
            error: 'One or more request body parameter is missing'
          });
        }
        return res.json({
          status: false,
          error: 'One or more request body parameter is missing'
        });
      }

      return res.json({
        status: false,
        error: 'One or more request body parameter is missing'
      });

    });

  // Get ads endpoint
  router.route('/get-ads')
    .get(async (req, res) => {
      const ads = await Ad.find().populate('campaign adset adcontent');
      if (!ads) {
        return res.status(200).json({
          status: true,
          ads
        });
      }
      return res.status(200).json({
        status: true,
        ads
      });
    });

  // Get single ad
  router.route('/get-ads/:id')
    .get(async (req, res) => {
      const ad_id = req.params.id;

      try {
        const ad = await Ad.findOne({ ad_id: ad_id }).populate('campaign adset adcontent');
        if (!ad) {
          return res.status(200).json({
            status: false,
            error: 'No ad found'
          });
        }
        return res.status(200).json({
          status: true,
          ad
        });
      } catch (error) {
        return res.status(500).json({
          status: false,
          error
        });
      }
    });

  return router;
};

export default routes;
