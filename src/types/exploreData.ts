export interface ExplorerData {
    id: string | number,
    name: string,
    isFolder: boolean,
    child: Array<ExplorerData>
}