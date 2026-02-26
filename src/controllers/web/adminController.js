

const getAdminPage = (req, res) => {
    // chỉ render giao diện, không lấy dữ liệu ở đây
    return res.render("admin");
};

const getEditPage = (req, res) => {
    // chỉ render giao diện, không lấy dữ liệu ở đây
    return res.render("edit");
};


module.exports = { getAdminPage, getEditPage };