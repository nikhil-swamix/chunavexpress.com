import path from 'path';

// import { payloadCloud } from '@payloadcms/plugin-cloud';
import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb'; // database-adapter-import
import { webpackBundler } from '@payloadcms/bundler-webpack'; // bundler-import
import { slateEditor } from '@payloadcms/richtext-slate'; // editor-import
import seo from '@payloadcms/plugin-seo';

import * as Editor from '@payloadcms/richtext-lexical';
// import lexical from "lexical";

import Type from 'payload/types';
interface HasTitle {
    title: string;
}
// filter keys containing Feature
const features = Object.keys(Editor).filter((key) => key.includes('Feature'));

let Users: Type.CollectionConfig = {
    slug: 'users',
    auth: true,
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'email',
    },
    fields: [
        // Email added by default
        // Add more fields as needed
    ],
};

let Categories: Type.CollectionConfig = {
    slug: 'categories',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
    },

    labels: {
        singular: 'Category',
        plural: 'Categories',
    },
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
        },
    ],
};

/* POST RESPONSE

*/
let Posts: Type.CollectionConfig = {
    slug: 'posts',
    // auth: false,
    access: {
        read: () => true,
    },

    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'publishDate', 'tags', 'status'],
        livePreview: {
            url: 'http://localhost:3000/posts/{{slug}}',
        },
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'title_hindi',
            label: 'Title Hindi',
            type: 'text',
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'banner',
            type: 'upload',
            relationTo: 'media',
            admin: {
                position: 'sidebar',
            },
        },
        // editors pick boolean
        {
            name: 'editorPick',
            type: 'checkbox',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'body_english',
            label: 'English Content',
            type: 'richText',
        },
        {
            name: 'body_hindi',
            label: 'Hindi Content',
            type: 'richText',
        },
        // before enter create a slug and convert all spaces to -
        {
            name: 'slug',
            type: 'text',
            index: true,
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [
                    async ({ originalDoc, value, data }) => {
                        // console.log({ data });
                        let slug = data.title.toLowerCase();
                        slug = slug.replace(/\s[^a-zA-Z0-9\s-]\s/g, ' ');
                        slug = slug.replace(/[^a-zA-Z0-9\s-]/g, ''); // replace non alpha numeric characters with null
                        // \s[^a-zA-Z0-9\s]\s
                        slug = slug.replace(/\s/g, '-');
                        // console.log('transformed', { [originalDoc.title]: slug });

                        // originalDoc.slug = slugFmt;
                        return slug;
                    },
                ],
            },
        },
    ],
};

let Media: Type.CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
    },

    upload: {
        staticURL: '/media',
        staticDir: 'media',

        imageSizes: [
            {
                name: 'optimized',
                width: 400,
                height: undefined,
                position: 'centre',
                formatOptions: {
                    format: 'webp',
                    options: {
                        quality: 80,
                    },
                },
            },
        ],
        formatOptions: {
            format: 'webp',
            options: {
                quality: 60,
            },
        },
        crop: false,
        adminThumbnail: 'thumbnail',

        mimeTypes: ['image/*'],
    },

    fields: [
        {
            name: 'alt',
            type: 'text',
        },
    ],
    // make file url replacespaces with - before write
    hooks: {
        // beforeValidate: [fnameupdater],
        // beforeChange: [fnameupdater],
        beforeOperation: [
            ({ args, operation }) => {
                if (operation === 'read') return args.data;
                if (operation === 'create') {
                    args.req.files.file.name = args.req.files.file.name.replace(/\s/g, '-');
                }
            },
        ],
    },
};

let Youtube: Type.CollectionConfig = {
    slug: 'youtube',
    labels: {
        plural: 'Youtube Videos',
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'videoId',
            type: 'text',
            required: true,
        },
    ],
};

export default buildConfig({
    admin: {
        user: Users.slug,
        bundler: webpackBundler(),
    },
    editor: Editor.lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, Editor.BoldTextFeature()],
    }),
    collections: [Users, Posts, Categories, Media, Youtube],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
    plugins: [
        seo({
            collections: ['posts'],
            uploadsCollection: 'media',
            generateTitle: ({ doc, locale, ...docInfo }) => {
                // console.log(doc);
                //@ts-ignore
                return `${doc.title.value.slice(0, 57)}...`;
            },
            generateDescription: ({ doc }) =>
                `This is a sample description, please write a description acc to post! the description will help boost your SEO Rankings! and bring more visitors.`,
            generateURL: ({ doc, locale }) => {
                console.log(doc);
                //@ts-ignore
                return `https://chunavexpress.com/post/${doc.fields.slug.value}`;
            },
        }),
    ],
    // database-adapter-config-start
    db: mongooseAdapter({
        url: process.env.DATABASE_URI,
    }),
    // database-adapter-config-end
});
