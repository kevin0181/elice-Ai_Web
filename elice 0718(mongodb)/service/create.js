const {Post} = require('./../models');

exports.create = async () => {
    const created = await Post.create({
        title: 'first title', content: 'second title',
    });
}
