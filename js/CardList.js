export default class CardList {
    constructor(container, api, createCardCallBack) {
        this.container = container;
        this.api = api;
        this.createCardCallBack = createCardCallBack;
    }

    addCard(name, link, numbers) {
        const newPlaceList = this.createCardCallBack(name, link, numbers);

        this.container.append(newPlaceList);
    }

    sendCardServer(name, link) {
        this.api.sendCard(name, link)
            .then(() => {
                this.render();
            })
            .catch((err) => {
                console.log(err);
            });
    }


    render() {
        this.api.getTasks()
            .then((res) => {
                res.forEach((item) => {
                    this.addCard(item.name, item.link, item.likes.length);
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

}