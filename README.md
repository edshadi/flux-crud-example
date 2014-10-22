# Flux CRUD
Simple CRUD app builder in Flux and React.

## Useage
```javascript
FluxCrud.scaffold({
  name: 'Todo',
  api: {
    index: '/posts' ,
    show: '/posts/:id'
    new: '/posts/new' ,
    create: '/posts' ,
    edit: '/posts/:id/edit' ,
    update: '/posts/:id' ,
    destroy: '/posts/:id'
   }
})

var Todos =

<!-- var TodoApp = CrudFlux.createApp({
  name: 'Todo',
  api: {
    index: '/posts' ,
    show: '/posts/:id'
    new: '/posts/new' ,
    create: '/posts' ,
    edit: '/posts/:id/edit' ,
    update: '/posts/:id' ,
    destroy: '/posts/:id'
   }
})

var TodoActions = TodoApp.actions({});
var TodoStore = TodoApp.store({});
TodoActions.create();
TodoActions.update();
TodoActions.destroy();
TodoStore.index();
TodoStore.show();
TodoStore.new();
TodoStore.edit();

var Todo = TodoApp.showComponent()
var TodoForm -->
```
