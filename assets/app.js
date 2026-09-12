'use strict';
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {closeMenu();menu.focus();} });
const links = [...document.querySelectorAll('[data-nav]')];
function updateNavigation() {
  let active = links[0];
  for (const link of links) { if (document.getElementById(link.dataset.nav).getBoundingClientRect().top <= 180) active = link; }
  for (const link of links) {
    if (link === active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    link.firstElementChild.style.width = link === active ? '16px' : '0';
  }
  const folio = document.querySelector('[data-rail-pie] span');
  if (folio) folio.textContent = ['—','i','ii','iii','iv','v','vi','vii','viii','ix'][links.indexOf(active)];
}
let queued = false;
window.addEventListener('scroll', () => { if (!queued) { queued=true;requestAnimationFrame(() => {updateNavigation();queued=false;});} }, {passive:true});
updateNavigation();
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => { for (const entry of entries) if(entry.isIntersecting) {entry.target.classList.remove('reveal-pending');observer.unobserve(entry.target);} }, {threshold:0});
  document.querySelectorAll('[data-reveal]').forEach(el => {el.classList.add('reveal-pending');observer.observe(el);});
}
const objective = document.querySelector('#objective-filter');
const semester = document.querySelector('#semester-filter');
function filterSchedule() {
  document.querySelectorAll('[data-objective]').forEach(row => {row.hidden=objective.value !== 'all' && row.dataset.objective !== objective.value;});
  document.querySelectorAll('[data-semester]').forEach(cell => {cell.hidden=semester.value !== 'all' && cell.dataset.semester !== semester.value;});
  document.querySelector('#schedule-status').textContent = `${objective.selectedOptions[0].textContent} · ${semester.selectedOptions[0].textContent}.`;
}
objective.addEventListener('change',filterSchedule);semester.addEventListener('change',filterSchedule);
let printState;
function preparePrint() {
  if(printState) return;
  printState = { details:[...document.querySelectorAll('details')].map(el=>[el,el.open]), hidden:[...document.querySelectorAll('.schedule [hidden]')] };
  printState.details.forEach(([el])=>{el.open=true;});printState.hidden.forEach(el=>{el.hidden=false;});
}
function restorePrint() { if(!printState)return;printState.details.forEach(([el,open])=>{el.open=open;});printState.hidden.forEach(el=>{el.hidden=true;});printState=null; }
window.addEventListener('beforeprint',preparePrint);window.addEventListener('afterprint',restorePrint);
document.querySelector('.print-button').addEventListener('click',()=>{preparePrint();window.print();restorePrint();});
