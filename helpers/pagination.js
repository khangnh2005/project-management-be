module.exports = (objectPagination , query , countProducts) => {
     if(query.page){
        objectPagination.currentPage = parseInt(query.page) 
    }
    const totalPage = Math.ceil(countProducts / objectPagination.limitItems);
    console.log(totalPage);
    objectPagination.totalPage = totalPage;
    return objectPagination;
}