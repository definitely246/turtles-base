
module.exports = {

    site: {
        name: 'Turtles Site',
        url: "https://turtles.cc",
        google_ad_client: null,
        disqus_shortname: null,
        contact_email: 'no-spam-2073@my-email.com',
        author: 'Master Roshi',
        author_email: 'masterroshiisawesome@fakeemail.com',
    },

    /**
     * Location of our content database directory
     */
    dir: 'content',

    /**
     * Directory to send static images files
     */
    target: 'site',

    /**
     * This stores all the data
     * from our content directory
     */
    database: 'database.js',

    /**
     * Any file or directory pattern here will
     * be treated as static content even if it
     * matches the extension below
     */
    static: [
        'static/**'
    ],

    /**
     * This is the extension of the files we store our 
     * data in as markdown/frontmatter yaml store
     */
    extension: '.md',

    /**
     * Allows us to modify the database after
     * it is been completed
     */
    updated: function(database) {
        database.site = this.site;
        return database;
    },

    /**
     * schemas let us define fields, validations, generators
     * for every dynamic content type we create, this is not 
     * required for dynamic content, but it allows us to 
     * extend and structure our dynamic content in a more controlled way
     */
    schemas: {
        posts: require('./turtles/schema.posts.js')
    }
}
