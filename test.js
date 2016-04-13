var list = [{ title: 'a', name: 'joe' }, { title: 'a', name: 'jimbob' }, { title: 'a', name: 'jim' }, { title: 'b', name: 'carol' }, { title: 'b', name: 'bob' }];
// var newList = [];

for (var i = 0; i < list.length; i++) {
  console.log('comparing ' + list[i].name);
  var itemsToRemove = [];
  for (var j = i + 1; j < list.length; j++) {
    if(list[i].title === list[j].title) {
      itemsToRemove.push(j);
      list[i].name = list[i].name + ', ' + list[j].name;
      // var newObj = { title: list[i].title, name: list[i].name + ', ' + list[j].name };
      // // newList.splice(i, 1);
      // // newList.splice(j, 1);
      // newList.push(newObj);
    }
  }
  for (var j = itemsToRemove.length - 1; j >= 0; j--) {
    list.splice(itemsToRemove[j], 1);
  }
}
console.log(list);
// console.log(newList);
