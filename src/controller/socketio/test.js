module.exports = class extends think.Controller {
    constructor(...arg) {
        super(...arg)
    }
    async openAction () {
        var data = this.wsData.data
        this.emit()
        return this.success()
    }
}