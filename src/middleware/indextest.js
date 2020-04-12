module.exports = (options, app) => {
    return async (ctx, next) => {
        if (ctx.method === 'OPTIONS') {
        return ctx.json({msg:'Ok'})
        }
        return next()
    }
}