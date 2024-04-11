const Product = require("../models/products");

const getAllProducts = async (req, res) => {
    const { company, featured, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};

    //filtering
    if (featured) {
        //this works as boolean
        queryObject.featured = featured === "true" ? true : false;
        //this works as string
        // queryObject.featured = featured;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    if (numericFilters) {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "<": "$lt",
            "<=": "$lte",
            "=": "$eq",
        };
        const regEx = /\b(<|>|<=|>=|=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );

        const options = ["price", "rating"];

        filters.split(",").forEach((element) => {
            const [field, operator, value] = element.split("-");
            if (options.includes(field)) {
                queryObject[field] = {
                    [operator]: Number(value),
                };
            }
        });
    }

    console.log(queryObject);

    //response after filtering
    let result = Product.find(queryObject);

    //sorting
    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("createdAt");
    }

    if (fields) {
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
    }

    //pagination
    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 10;
    // const skip = (page - 1) * limit;

    // result = result.skip(skip).limit(limit);

    //final result
    const products = await result;

    //api response
    res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
    getAllProducts,
};
