import {ExpressionNode} from '@rsql/ast';
import {Directive, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {parse} from '@rsql/parser';
import builder from '@rsql/builder';
import {emit} from '@rsql/emitter';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class PaginateFilterHelper {
  @Input() modelName: string;
  @Input() inputSearchBarValues: string[];
  @Input() inputSearchBarSelectValues: string[];

  filterForm: FormGroup;
  isFiltering: boolean = false;

  orExpression: ExpressionNode[] = [];
  andExpression: ExpressionNode[] = [];

  /**
   * PrepareRsl
   * @private
   */
  protected prepareRsql(): string {
    this.fillExpression();

    console.log(this.inputSearchBarSelectValues);

    return this.prepareRsqlStringFromAndOrExpression();
  }

  /**
   * Fill data from filter object
   * @private
   */
  protected fillExpression() {
    this.resetExpression();

    for (const key in this.filterForm.value) {
      if (this.filterForm.value[key] !== null) {
        if (this.inputSearchBarValues.includes(key)) {
          this.fillSearchBarExpression(key);
        }

        if (this.inputSearchBarSelectValues.includes(key)) {
          if (key === 'date') {
            this.fillDateExpression(key);
          } else {
            this.fillSearchbarSelectAndExpression(key);
          }
        }

        if (this.inputSearchBarSelectValues.includes(key + '.id')) {
          this.fillIdExpression(key);
        }
      }
    }
  }

  /**
   * Rsql builder prepare rsqlString
   * @private
   */
  private prepareRsqlStringFromAndOrExpression(): string {
    let rsqlString = '';

    if (this.orExpression.length > 0) { // if have or expression create rsql query
      rsqlString += '(' + emit(builder.or(...this.orExpression)) + ')';
    }

    if (this.andExpression.length > 0) { // if have and expression create rsql query
      rsqlString += ((rsqlString === '' ? '(' : ';(') + emit(builder.and(...this.andExpression)) + ')');
    }

    return rsqlString;
  }

  /**
   * Reset expression every filter
   * @private
   */
  private resetExpression(): void {
    this.orExpression = [];
    this.andExpression = [];
  }

  /**
   * Fill search bar select values
   * @private
   */
  private fillSearchBarExpression(key: string) {
    this.orExpression.push(parse(`${this.modelName}.${key}=="*${this.slugifyRsqlFilter(this.filterForm.value[key])}*"`));
  }

  /**
   * Ng select id fill
   * @param key
   * @private
   */
  private fillIdExpression(key: string) {
    this.andExpression.push(parse(`${this.modelName}.${key + '.id'}==${this.filterForm.value[key].id}`));
  }

  /**
   * Fill ng select and expression not id
   * @param key
   * @private
   */
  private fillSearchbarSelectAndExpression(key: string) {
    this.andExpression.push(parse(`${this.modelName}.${key}==${this.filterForm.value[key]}`));
  }

  /**
   * If date is search
   * @param key
   * @private
   */
  private fillDateExpression(key: string) {
    this.andExpression.push(
      builder.and(
        builder.ge(`${this.modelName}.start`, this.filterForm.value[key].start),
        builder.le(`${this.modelName}.end`, this.filterForm.value[key].end)
      )
    );
  }

  /**
   * Slugify filter
   * @param filterElement
   */
  private slugifyRsqlFilter(filterElement: string): string {
    return filterElement.replace(/[&\/\\#^+()$~%'":*?<>{},![\]]/g, '').trimLeft();
  }
}
