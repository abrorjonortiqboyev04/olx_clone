// Error message
exports.errorMessage = (res, renderPage, title, error, oldText)=>{
    return res.render(renderPage,{
                title,
                error,
                oldText
            })
}