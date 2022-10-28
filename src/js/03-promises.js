import "notiflix/dist/notiflix-3.2.5.min.css";
import {Notify} from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form.form'),
};

refs.form.addEventListener('submit', onSubmitForm)

function getFormData(formRef) {
  return [...formRef.elements]
    .filter(it => it.hasAttribute('name'))
    .reduce((acc, it) => ({
      ...acc,
      [it.getAttribute('name')]: Number(it.value),
    }), {})
}

function onSubmitForm(e) {
  e.preventDefault();
  const {delay, step, amount} = getFormData(refs.form)
  for (let i = 1; i <= amount; i++) {
    const promise = i === 0 ? createPromise(i, delay) : createPromise(i, delay + i * step);
    promise
      .then(({position, delay}) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({position, delay}) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay)
  })
}

//test load