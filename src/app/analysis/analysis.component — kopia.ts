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
    ]
  }, {
    name: 'Kręgosłup',
    children: [
      {name: 'Wielkość kąta skrzywienia'},
      {name: 'Liczba kręgów skrzywienia'},
      {name: 'Współczynnik F Harringtona'},
    ]
  },{
    name: 'Kręgosłup od skrzywienia',
    children: [
      {
        name: 'Podzbiór 1',
        children: [
          {name: 'Parametr 1'},
          {name: 'Parametr 2'},
        ]
      }, {
        name: 'Podzbiór 2',
        children: [
          {name: 'Parametr 1'},
          {name: 'Parametr 2'},
        ]
      },
    ]
  },{
    name: 'Kręgosłup piersiowy',
    children: [
      {
        name: 'Podzbiór 1',
        children: [
          {name: 'Parametr 1'},
          {name: 'Parametr 2'},
        ]
      }, {
        name: 'Podzbiór 2',
        children: [
          {name: 'Parametr 1'},
          {name: 'Parametr 2'},
        ]
      },
    ]
  },{
    name: 'Kręgosłup lędźwiowy',
    children: [
      {
        name: 'Podzbiór 1',
        children: [
          {name: 'Parametr 1'},
          {name: 'Parametr 2'},
        ]
      }, {
        name: 'Podzbiór 2',
        children: [
          {name: 'Parametr 1'},
          {name: 'Parametr 2'},
        ]
      },
    ]
  },{
    name: 'Miednica',
    children: [
      {
        name: 'Podzbiór 1',
        children: [
          {name: 'Parametr 1'},
          {name: 'Parametr 2'},
        ]
      }, {
        name: 'Podzbiór 2',
        children: [
          {name: 'Parametr 1'},
          {name: 'Parametr 2'},
        ]
      },
    ]
  },{
    name: 'Kolana',
    children: [
      {
        name: 'Podzbiór 1',
        children: [
          {name: 'Parametr 1'},
          {name: 'Parametr 2'},
        ]
      }, {
        name: 'Podzbiór 2',
        children: [
          {name: 'Parametr 1'},
          {name: 'Parametr 2'},
        ]
      },
    ]
  },{
    name: 'Stopy',
    children: [
      {
        name: 'Podzbiór 1',
        children: [
          {name: 'Parametr 1'},
          {name: 'Parametr 2'},
        ]
      }, {
        name: 'Podzbiór 2',
        children: [
          {name: 'Parametr 1'},
          {name: 'Parametr 2'},
        ]
      },
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
  showBooleans = "true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false";

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
    //this.chart?.showChart("true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false".split(","));
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  itemSelectionToggle(node: ExampleFlatNode){
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

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

  getStringFromSelection(): string[]{
    this.dataSource.data.forEach(element => {
      
    });
    
    return ["true"];
  }
}
