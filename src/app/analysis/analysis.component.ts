import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {LineChartComponent} from '../line-chart/line-chart.component';
import {SelectionModel} from '@angular/cdk/collections';


interface ExampleNode {
  name: string;
  children?: ExampleNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA = [
  {
    name: 'Ogólne',
    children: [
      {name: 'Wysokość ciała'},
      {name: 'Długość kończyny dolnej lewej'},
      {name: 'Długość kończyny dolnej prawej'},
      {name: 'Wiek'},
    ]
  }, {
    name: 'Szyja i barki',
    children: [
      {name: 'Głębokość lordozy szyjnej'},
      {name: 'Skrzywienie ramion w płaszczyźnie czołowej'},
    ]
  },{
    name: 'Kręgosłup piersiowy',
    children: [
      {name: 'Wielkość kątowa skrzywienia [st Cobba] (opcja)'},
      {name: 'Liczba kręgów skrzywienia (opcja)'},
      {name: 'Przebieg skrzywienia pierwotnego\u00a0ile kr\u0119g\u00f3w'},
      {name: 'Przebieg skrzywienia wtórnego ile kr\u0119g\u00f3w'},
      {name: 'Wielkość kąta ATR pierwotnego [kąt rotacji tułowia] (opcja)'},
      {name: 'Wielkość kąta ATR wtórnego [kąt rotacji tułowia] (opcja)'},
      {name: 'Szczyt skrzywienia pierwotnego'},
      {name: 'Szczyt rotacji (pierwotne)'},
      {name: 'Szczyt skrzywienia wtórnego'},
      {name: 'Szczyt rotacji (wtórne)'},
    ]
  },{
    name: 'Kręgosłup lędźwiowy',
    children: [
      {name: 'Głębokość lordozy lędźwiowej'},
      {name: 'Skrzywienie ramion w płaszczyźnie strzałkowej'},
    ]
  },{
    name: 'Miednica',
    children: [
      {name: 'Szerokość miednicy'},
      {name: 'Skrzywienie miednicy w płaszczyźnie czołowej'},
      {name: 'Skrzywienie miednicy w płaszczyźnie strzałkowej'},
    ]
  },{
    name: 'Stopy',
    children: [
      {name: 'Szerokość ustawienia stóp'},
      {name: 'Rotacja stopa lewa'},
      {name: 'Rotacja stopa prawa'},
    ]
  },
];



@Component({
  selector: 'analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  @ViewChild(LineChartComponent) chart?: LineChartComponent;

  checklistSelection = new SelectionModel<ExampleFlatNode>(true /* multiple */);
  showValues:string = "Głębokość lordozy lędźwiowej";
  private _transformer = (node: ExampleNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }
  
  ngAfterViewInit(){
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      if (this.treeControl.dataNodes[i].name == 'Głębokość lordozy lędźwiowej') {
        this.leafItemSelectionToggle(this.treeControl.dataNodes[i]);
        this.treeControl.expand(this.treeControl.dataNodes[i])
      }
    }
  }

  getLevel = (node: ExampleFlatNode) => node.level;

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    
  }

  descendantsAllSelected(node: ExampleFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  descendantsPartiallySelected(node: ExampleFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  leafItemSelectionToggle(node: ExampleFlatNode){
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    this.updateStringFromSelection();
  }

  itemSelectionToggle(node: ExampleFlatNode){
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    
    this.updateStringFromSelection();
    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: ExampleFlatNode): void {
    let parent: ExampleFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: ExampleFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: ExampleFlatNode): ExampleFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  updateStringFromSelection(){
    this.showValues = "";
    for(let i = 0; i < this.checklistSelection.selected.length; i++)
    {
      this.showValues += this.checklistSelection.selected[i].name + ",";
    }
    this.showValues = this.showValues.substr(0,this.showValues.length-1);
  }
}
