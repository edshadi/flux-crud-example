jest.dontMock('react/lib/copyProperties');
jest.dontMock('../../constants/todo-constants');
jest.dontMock('../todo-store');

describe('TodoStore', function() {
  var TodoConstants = require('../../constants/todo-constants');
  beforeEach(function () {
    TodoDispatcher = require('../../dispatchers/todo-dispatcher');
    TodoStore = require('../todo-store');
  });
  describe('payload', function () {
    it('should register a callback with the dispatcher', function() {
      expect(TodoDispatcher.register.mock.calls.length).toBe(1);
    });
  });
  describe('actions', function () {
    beforeEach(function () {
      callback = TodoDispatcher.register.mock.calls[0][0];
    });
    it('#todos is initialized with an empty collection', function () {
      expect(TodoStore.todos()).toEqual([]);
    });
    it('#new returns an blank todo', function () {
      expect(TodoStore.new()).toEqual({
          id: null,
          title: null
        });
    });
    it('#all', function () {
      TodoStore.triggerChange = jest.genMockFunction();
      TodoStore.all();
      expect(TodoStore.triggerChange.mock.calls.length).toBe(1)
    });
    it('#create', function () {
      var actionTodoCreate = {
        source: 'VIEW_ACTION',
        action: {
          type: TodoConstants.ActionTypes.CREATE_TODO,
          data: {title: 'foo'}
        }
      };
      callback(actionTodoCreate);
      expect(TodoStore.todos()).toEqual([actionTodoCreate.action.data])
    });
    it('#update', function () {
      TodoStore.create({title: 'foo'})
      var actionTodoUpdate = {
        source: 'VIEW_ACTION',
        action: {
          type: TodoConstants.ActionTypes.UPDATE_TODO,
          data: {id: 1, title: 'bar'}
        }
      };
      callback(actionTodoUpdate);
      expect(TodoStore.todos()).toEqual([actionTodoUpdate.action.data])
    });
    it('#update', function () {
      TodoStore.create({title: 'foo'})
      var actionTodoDestroy = {
        source: 'VIEW_ACTION',
        action: {
          type: TodoConstants.ActionTypes.DESTROY_TODO,
          id: 1
        }
      };
      callback(actionTodoDestroy);
      expect(TodoStore.todos()).toEqual([])
    });
  });
  it('#find returns the index of the found todo', function () {
    TodoStore.create({title: 'foo'})
    expect(TodoStore.find(1)).toEqual(0)
    expect(TodoStore.find(2)).toEqual(undefined)
  });
  describe('events', function () {
    beforeEach(function () {
      bean = require('bean');
      CHANGE_EVENT = 'change';
      FAIL_TO_CREATE_EVENT = 'creation-failed';
    });
    it('#addChangeEvent', function () {
      var callback = jest.genMockFunction();
      TodoStore.addChangeEvent(callback)
      var arguments = bean.on.mock.calls[0];
      expect(arguments[0]).toEqual(TodoStore);
      expect(arguments[1]).toEqual(CHANGE_EVENT);
      expect(arguments[2]).toEqual(callback);
    });
    it('#removeChangeEvent', function () {
      var callback = jest.genMockFunction();
      TodoStore.removeChangeEvent(callback)
      var arguments = bean.off.mock.calls[0];
      expect(arguments[0]).toEqual(TodoStore);
      expect(arguments[1]).toEqual(CHANGE_EVENT);
      expect(arguments[2]).toEqual(callback);
    });
    it('#addFailToTakeAction', function () {
      var callback = jest.genMockFunction();
      TodoStore.addFailToTakeAction(callback)
      var arguments = bean.on.mock.calls[0];
      expect(arguments[0]).toEqual(TodoStore);
      expect(arguments[1]).toEqual(FAIL_TO_CREATE_EVENT);
      expect(arguments[2]).toEqual(callback);
    });
    it('#removeFailToTakeAction', function () {
      var callback = jest.genMockFunction();
      TodoStore.removeFailToTakeAction(callback)
      var arguments = bean.off.mock.calls[0];
      expect(arguments[0]).toEqual(TodoStore);
      expect(arguments[1]).toEqual(FAIL_TO_CREATE_EVENT);
      expect(arguments[2]).toEqual(callback);
    });
    it('#triggerChange', function () {
      var data = {};
      TodoStore.triggerChange(data)
      var arguments = bean.fire.mock.calls[0];
      expect(arguments[0]).toEqual(TodoStore);
      expect(arguments[1]).toEqual(CHANGE_EVENT);
      expect(arguments[2]).toEqual(data);
    });
    it('#triggerFailToTakeAction', function () {
      var data = {};
      TodoStore.triggerFailToTakeAction(data)
      var arguments = bean.fire.mock.calls[0];
      expect(arguments[0]).toEqual(TodoStore);
      expect(arguments[1]).toEqual(FAIL_TO_CREATE_EVENT);
      expect(arguments[2]).toEqual(data);
    });
  });
});
