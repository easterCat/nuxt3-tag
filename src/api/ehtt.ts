import Request from '~~/src/utils/request';

class EhttApi extends Request {
    // https://ehtt.fly.dev/swagger
    getNameSpaceList() {
        return this.get('https://ehtt.fly.dev/database', {}, 'github');
    }

    getListByNameSpace() {
        return this.get(
            `https://raw.githubusercontent.com/EhTagTranslation/Database/master/database/female.md`,
            {},
            'github',
        );
    }

    getAllJsonData() {
        return this.get(
            'https://raw.githubusercontent.com/EhTagTranslation/DatabaseReleases/master/db.full.json',
            {},
            'github',
        );
    }
}

export default new EhttApi();
