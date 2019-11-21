/* eslint-disable import/no-cycle */
import { userName } from './index';

const axios = require('axios');

let todos = [];
let navId = 'all';

const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $nav = document.querySelector('.todolist-nav');
const $clearCompleted = document.querySelector('.clear-completed > .btn');
const $completeAll = document.querySelector('.complete-all');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');
const $scrollIcon = document.querySelector('.scroll-icon');
const $countGoalNumber = document.querySelector('.count-goal-number');

// 렌더
const render = () => {
  if (!userName) {
    $scrollIcon.style.display = 'none';
    $todos.innerHTML = '<div class="empty-ment">닉네임 입력 후 사용 가능합니다.</div>';
  } else {
    let html = '';

    const _todos = todos.filter(todo => todo.nickName === userName)
      .filter(todo => (
        navId === 'all' ? true : navId === 'active' ? !todo.completed : todo.completed
      ));

    _todos.forEach(({ id, content, completed }) => {
      html += `
      <li id="${id}" class="todo-item">
        <input class="checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
        <label for="ck-${id}">${content}</label>
        <input id="modify-${id}" class="modify-todo-input" type="text" style="display: none;">
        <i class="modify-todo fas fa-edit"></i>
        <i class="remove-todo far fa-trash-alt"></i>
      </li>`;
    });

    $completedTodos.textContent = todos.filter(todo => todo.nickName === userName)
      .filter(todo => todo.completed).length;
    $activeTodos.textContent = todos.filter(todo => todo.nickName === userName)
      .filter(todo => !todo.completed).length;
    $todos.innerHTML = html;

    $scrollIcon.style.display = $todos.children.length > 5 ? 'block' : 'none';
    if (!$todos.children.length) $todos.innerHTML = '<div class="empty-ment">오늘은 무엇으로 잔디를 채울 예정인가요?</div>';
  }
};

// 기능
const findMaxId = () => Math.max(0, ...todos.map(todo => todo.id)) + 1;

// 이벤트 함수
const getTodos = async () => {
  try {
    const res = await axios.get('/CommitTodos');
    console.log(res);
    todos = res.data;
    render();
  } catch (error) {
    console.error(error);
  }
};

const addTodos = async () => {
  try {
    const todo = {
      id: findMaxId(),
      content: $inputTodo.value,
      completed: false,
      nickName: userName,
      goalCommit: +$countGoalNumber.textContent
    };
    const res = await axios.post('/CommitTodos', todo);
    todos = res.data;
    render();
  } catch (error) {
    console.error(error);
  }
  $inputTodo.value = '';
};

const removeTodo = async id => {
  try {
    const res = await axios.delete(`/CommitTodos/${id}`);
    todos = res.data;
    render();
  } catch (error) {
    console.log(error);
  }
};

const changeTodo = async (id, content) => {
  try {
    const res = await axios.patch(`/CommitTodos/modifiedTodos/${id}`, { content });
    todos = res.data;
    render();
  } catch (error) {
    console.log(error);
  }
};

const modifyTodo = id => {
  const $modifyTodoInput = document.querySelector(`#modify-${id}`);
  $modifyTodoInput.style.display = 'block';
  $modifyTodoInput.value = $modifyTodoInput.previousElementSibling.innerText;
  $modifyTodoInput.previousElementSibling.innerText = '';
  $modifyTodoInput.focus();
  $modifyTodoInput.onkeydown = ({ keyCode, target }) => {
    if (keyCode === 13) {
      changeTodo(target.parentNode.id, $modifyTodoInput.value);
      $modifyTodoInput.style.display = 'none';
    }
  };
};

const toggleTodo = async id => {
  try {
    const completed = !todos.find(todo => todo.id === +id).completed;
    const res = await axios.patch(`/CommitTodos/${id}`, { completed });
    todos = res.data;
    render();
  } catch (error) {
    console.log(error);
  }
};

const toggleAll = async completed => {
  try {
    const res = await axios.patch('/CommitTodos', { completed });
    todos = res.data;
    render();
  } catch (error) {
    console.error(error);
  }
};

const clearTodos = async () => {
  try {
    const res = await axios.delete('/CommitTodos/completedTodos');
    todos = res.data;
    render();
  } catch (error) {
    console.error(error);
  }
};

const changeNav = li => {
  [...$nav.children].forEach($list => {
    $list.classList.toggle('active', $list === li);
  });
  navId = li.id;
  render();
};

const scrollIconStop = scrollY => {
  $scrollIcon.style.display = scrollY >= ($todos.children.length - 5) * 49 ? 'none' : 'block';
};

const warningText = () => {
  const $emptyMent = document.querySelector('.empty-ment');
  $emptyMent.classList.add('warning-text');
  $todos.style.overflow = 'hidden';
  setTimeout(function () {
    $emptyMent.classList.remove('warning-text');
    $todos.style.overflow = null;
  }, 3002);
};

// 이벤트
window.onload = () => {
  getTodos();
};

$inputTodo.onkeyup = ({ target, keyCode }) => {
  if (keyCode !== 13 || target.value.trim() === '') return;
  if (!userName) warningText();
  else addTodos();
};

$todos.onclick = ({ target }) => {
  if (target.classList.contains('remove-todo')) removeTodo(target.parentNode.id);
  if (target.classList.contains('modify-todo')) modifyTodo(target.parentNode.id);
};

$todos.onchange = ({ target }) => {
  toggleTodo(target.parentNode.id);
};

$completeAll.onchange = ({ target }) => {
  toggleAll(target.checked);
};

$clearCompleted.onclick = () => {
  clearTodos();
};

$nav.onclick = ({ target }) => {
  if (target.classList.contains('nav')) return;
  changeNav(target);
};

$todos.onscroll = ({ target }) => {
  scrollIconStop(target.scrollTop);
};

export default getTodos;
