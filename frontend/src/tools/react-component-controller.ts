export default abstract class ReactComponentController<T, P> {
    public abstract initialModel(): T;
    public abstract initialize(): Promise<void>;

    protected props: P;
    protected constructor(props: P) {
        this.props = props;
    }

    protected _model: T = this.initialModel();
    get model(): T {
        return this._model;
    }

    protected update: () => void = () => {};
    public setModelSetter(setter: React.Dispatch<React.SetStateAction<T>>) {
        this.update = () => {
            setter({ ...this.model });
        };
    }

    get propertySetter(): (fn: (model: T) => void) => void {
        return (fn: (model: T) => void) => this._setProperty(fn);
    }

    private _setProperty(callback: (model: T) => void): void {
        callback(this.model);
        this.update();
    }
}
