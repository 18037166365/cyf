'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('case', [{
     name: '李先生, 王小姐',
     age: '38, 36',
     content: '我是conent',
     headImg: 'http://www.thaiyuehealth.com/uploadfile/2018/1023/thumb_100_100_20181023112151568.png'
   },])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('case', null, {});
  }
};
