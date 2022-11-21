import Request from '~~/src/utils/request';

class EhttApi extends Request {
    // https://ehtt.fly.dev/swagger
    getNameSpaceList() {
        return this.get('https://ehtt.fly.dev/database');
    }

    getListByNameSpace() {
        return this.get(
            `https://raw.githubusercontent.com/EhTagTranslation/Database/master/database/female.md`,
        );
    }

    getAllJsonData() {
        return this.get(
            'https://raw.githubusercontent.com/EhTagTranslation/DatabaseReleases/master/db.full.json',
        );
    }
}

export default new EhttApi();
