import icons from 'url:../../img/icons.svg';
import View from './view.js';
import { RES_PER_PAGE } from '../config';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / RES_PER_PAGE);
    const curPage = this._data.page;
    //Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButtonRight(curPage);
    }
    //Page 1, and no other page

    //Last Page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButtonLeft(curPage);
    }
    //Other Page
    if (curPage < numPages) {
      return `${this._generateMarkupButtonLeft(curPage)}
      ${this._generateMarkupButtonRight(curPage)}`;
    }

    return '';
  }

  _generateMarkupButtonLeft(curPage) {
    return `<button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>`;
  }

  _generateMarkupButtonRight(curPage) {
    return `<button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }
}

export default new PaginationView();
