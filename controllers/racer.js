var fs = require('fs');

module.exports = {

  index: async (req, res, next) => {
    console.log("index");
    res.status(200).json("index");
  },

  getRacer: async (req, res, next) => {

    const json = "/controllers/data/" + req.params.racerid + ".json"

    var now = new Date();
    var accum_secs = now.getMinutes() * 60 + now.getSeconds();
    var accum_millisecs = accum_secs * 1000;

    var racer;
    var tracks = [];

    var increment = 444;

    if(req.params.racerid == 'denver') {
      increment -= 25;
    }
    if(req.params.racerid == 'chicago') {
      increment += 25;
    }

    fs.readFile(process.cwd() + json, "utf8", function (err, data) {
      if (err) throw err;
      racer = JSON.parse(data);

      var elapsed = 0;
      for (var tp of racer) {
        tp.ms = elapsed;
        elapsed = elapsed + increment;
      }

      return_position = racer[0];

      var i = 0;
      for (var tp of racer) {

        if(parseFloat(tp.ms) < parseFloat(accum_millisecs)) {
          current_point = [];
          current_point[0] = parseFloat(tp.lat);
          current_point[1] = parseFloat(tp.long);
          return_position = tp;
          i++;
        }
        else {
          break;
        }
      }

      var response = {};
      response.Race_complete = false;
      response.Position = return_position;
      response.i = i;
      response.barId = req.params.racerid;
      res.status(200).json(response);
    });
  },

  newRacer: async (req, res, next) => {
    //firebase.database().ref('racers/' + racer.racer_name).set(racer);
    res.status(200).json(racer);
  },

  deleteRacer: async (req, res, next) => {
    console.log("deleteRacer");
    // if(process.env.NODE_ENV && process.env.NODE_ENV == 'production') {
    //   res.status(200).json('disabled');
    // }
    // else {
    //   const { ownermid } = req.value.params;
    //   const ownerM = await OwnerM.findByIdAndRemove(ownermid);
    //   res.status(200).json({ success: true });
    // }
  },

  replaceRacer: async (req, res, next) => {
    console.log("replaceRacer");

    racerRef.transaction(function(racer) {
      if (racer) {
        console.log("inserting new racer")
        //post.starCount = post.stars ? Object.keys(post.stars).length : 0;
      }
      //return racer;
      res.status(200).json("newRacer");
    });

    // if(process.env.NODE_ENV && process.env.NODE_ENV == 'production') {
    //   res.status(200).json('disabled');
    // }
    // else {
    //   const { ownermid } = req.value.params;
    //   const newProps = req.value.body;
    //   const ownerMToReplace = await OwnerM.findByIdAndUpdate(ownermid, newProps);
    //   const ownerMReplaced = await OwnerM.findById(ownermid);
    //   res.status(200).json({ ownerMReplaced });
    // }
  },

  updateRacer: async (req, res, next) => {
    console.log("updateRacer");
    // if(process.env.NODE_ENV && process.env.NODE_ENV == 'production') {
    //   res.status(200).json('disabled');
    // }
    // else {
    //   const { ownermid } = req.value.params;
    //   const newProps = req.value.body;
    //   const ownerMToUpdate = await OwnerM.findByIdAndUpdate(ownermid, newProps);
    //   const ownerMUpdated = await OwnerM.findById(ownermid);
    //   res.status(200).json({ ownerMUpdated });
    // }
  }

};
