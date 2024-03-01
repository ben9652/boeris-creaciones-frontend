export class SearchFilter {
    static id_count: number = 1;
    private _id: number;
    private _filtro: string;
    
    constructor(
        filtro: string
    ) {
        this._id = SearchFilter.id_count++;
        this._filtro = filtro;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get filtro(): string {
        return this._filtro;
    }
    public set filtro(value: string) {
        this._filtro = value;
    }
}

/**
 * Para crear un árbol con varios niveles, se deben crear primero las hojas, y luego ir ampliando para los niveles superiores.
 * Esto debe hacerse así para que las claves se armen de manera correcta.
 */
export class TreeSelectObject<T = any> {
    /**
     * Label of the node.
     */
    label?: string;
    /**
     * Data represented by the node.
     */
    data?: T;
    /**
     * Icon of the node to display next to content.
     */
    icon?: string;
    /**
     * Icon to use in expanded state.
     */
    expandedIcon?: string;
    /**
     * Icon to use in collapsed state.
     */
    collapsedIcon?: string;
    /**
     * An array of treenodes as children.
     */
    children?: TreeSelectObject<T>[];
    /**
     * Specifies if the node has children. Used in lazy loading.
     * @defaultValue false
     */
    leaf?: boolean;
    /**
     * Expanded state of the node.
     * @defaultValue false
     */
    expanded?: boolean;
    /**
     * Type of the node to match a template.
     */
    type?: string;
    /**
     * Parent of the node.
     */
    parent?: TreeSelectObject<T>;
    /**
     * Defines if value is partially selected.
     */
    partialSelected?: boolean;
    /**
     * Inline style of the node.
     */
    style?: any;
    /**
     * Style class of the node.
     */
    styleClass?: string;
    /**
     * Defines if the node is draggable.
     */
    draggable?: boolean;
    /**
     * Defines if the node is droppable.
     */
    droppable?: boolean;
    /**
     * Whether the node is selectable when selection mode is enabled.
     * @defaultValue false
     */
    selectable?: boolean;
    /**
     * Mandatory unique key of the node.
     */
    private _key?: string | undefined;

    constructor(
        label: string
    );

    constructor(
        label: string,
        soyRaiz: boolean
    );

    constructor(
        label: string,
        icon?: string,
        selectable?: boolean
    );
    
    constructor(
        label: string,
        ...args:
            [soyRaiz: boolean] |
            [icon?: string, selectable?: boolean]) {
        this.label = label;
        this.partialSelected = false;
        this.expanded = false;
        if (this.children === undefined)
            this.children = [];
        
        if(typeof args[0] === 'boolean') {
            console.log('Creación de raíz');
            this.key = "0";
        }
        else if(typeof args[0] === 'string' && typeof args[1] === 'boolean') {
            this.icon = args[0];
            this.selectable = args[1];
        }
        else if(typeof args[0] === 'string') {
            this.icon = args[0];
        }
    }
    
    public get key(): string | undefined {
        return this._key;
    }
    public set key(value: string | undefined) {
        this._key = value;
    }

    public getNode(key: string): TreeSelectObject | null {
        const keyParts: string[] = key.split('-');
        let currentNode: TreeSelectObject | null = this;
        
        for(const part of keyParts) {
            if(!currentNode) {
                return null;
            }

            // Buscar el siguiente nodo en los hijos del nodo actual
            const index = parseInt(part);
            if(currentNode.children) {
                currentNode = currentNode.children[index] || null;
            }
        }

        return currentNode;
    }

    public equals(obj: TreeSelectObject): boolean {
        return this.key === obj.key;
    }

    public static getNodeFromArray(treeArray: TreeSelectObject[], key: string): TreeSelectObject | null {
        const keyParts: string[] = key.split('-');
        const firstIndex = parseInt(keyParts[0]);
        let currentNode: TreeSelectObject | null = treeArray[firstIndex];
        
        for(let i = 1; i < keyParts.length; i++) {
            if(!currentNode) {
                return null;
            }

            // Buscar el siguiente nodo en los hijos del nodo actual
            const index = parseInt(keyParts[i]);
            if(currentNode.children) {
                currentNode = currentNode.children[index] || null;
            }
        }

        return currentNode;
    }

    public static armarNivel(...nodes: TreeSelectObject[]): TreeSelectObject[] {
        let i: number = 0;

        nodes.forEach(node => {
            node.key = (i++).toString();
        })

        return nodes;
    }

    public static asignarPadre(padre: TreeSelectObject, hijos: TreeSelectObject[]): void {
        hijos.forEach(hijo => {
            if (hijo instanceof TreeSelectObject) {
                hijo.parent = padre;
                hijo.key = padre.key + "-" + hijo.key;
                padre.children?.push(hijo);
            }
        });
    }
}