
export default {
    snapshotToList(snapshot) {
        var keys = [];
        //console.log(Object.keys(snapshot.val())[0])
        snapshot.forEach((item) => {
          var key = item.key;
          var itemVal = item.val();
          itemVal.key = key;
          keys.push(itemVal);
        });
        return keys;
      }
}