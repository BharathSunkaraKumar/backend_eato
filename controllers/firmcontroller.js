const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');

//add storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

const addFirm = async(req, res) => {
    try{
        const {firmName, area, category, region, offer} = req.body;

        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);
        if(vendor.firm.length > 0) {
            return res.status(400).json({message: 'vendor can have only one firm'})
        }
        if(!vendor) {
            res.status(404).json({message: "vendor not found"});
        }
        const firm  = new Firm({
            firmName, area, category, region, offer, image, vendor: vendor._id
        })

        const saveFirm = await firm.save();
        const firmId = saveFirm._id
        vendor.firm.push(saveFirm)
        await vendor.save()

        return res.status(200).json({message: 'Firm added successfully', firmId});
    }catch(err) {
        console.log(err);
        res.status(500).json({err: 'firm not add'});
    }

}

const deleteFirmById = async(req, res) => {
    try{
        const firmId = req.params.firmId;
        const deletedProduct = await Firm.findByIdAndDelete(firmId);
        if(!deletedProduct) {
            return res.status(404).json({error:'no product found'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err: "Internal server error"})
    }
}

module.exports = {addFirm: [upload.single('image'), addFirm], deleteFirmById}