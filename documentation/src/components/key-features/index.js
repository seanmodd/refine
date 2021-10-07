import React from "react";

import styles from "./styles.module.css";

const backends = [
    [
        {
            src: "/icons/backends/nodejs.png",
            srcset: "/icons/backends/nodejs@2x.png 768w",
            alt: "nodejs",
        },
        {
            src: "/icons/backends/java.png",
            srcset: "/icons/backends/java@2x.png 768w",
            alt: "java",
        },
    ],
    [
        {
            src: "/icons/backends/dotnet.png",
            srcset: "/icons/backends/dotnet@2x.png 768w",
            alt: "dotnet",
        },
        {
            src: "/icons/backends/strapi.png",
            srcset: "/icons/backends/strapi@2x.png 768w",
            alt: "strapi",
        },
    ],
    [
        {
            src: "/icons/backends/airtable.png",
            srcset: "/icons/backends/airtable@2x.png 768w",
            alt: "airtable",
        },
        {
            src: "/icons/backends/json-api.png",
            srcset: "/icons/backends/json-api@2x.png 768w",
            alt: "json-api",
        },
    ],
    [
        {
            src: "/icons/backends/nest.png",
            srcset: "/icons/backends/nest@2x.png 768w",
            alt: "nest",
        },
        {
            src: "/icons/backends/python.png",
            srcset: "/icons/backends/python@2x.png 768w",
            alt: "python",
        },
    ],
    [
        {
            src: "/icons/backends/supabase.png",
            srcset: "/icons/backends/supabase@2x.png 768w",
            alt: "supabase",
        },
        {
            src: "/icons/backends/go.png",
            srcset: "/icons/backends/go@2x.png 768w",
            alt: "go",
        },
    ],
    [
        {
            src: "/icons/backends/graphql.png",
            srcset: "/icons/backends/graphql@2x.png 768w",
            alt: "supabase",
        },
        {
            src: "/icons/backends/altogic.png",
            srcset: "/icons/backends/altogic@2x.png 768w",
            alt: "go",
        },
    ],
];

const features = [
    {
        src: "/icons/features/zero.png",
        srcset: "/icons/features/zero@2x.png 768w",
        title: "Zero-configuration",
        description:
            "One-line setup with superplate. It takes less than a minute to start a project.",
    },
    {
        src: "/icons/features/decoupled.png",
        srcset: "/icons/features/decoupled@2x.png 768w",
        title: "Decoupled UI",
        description:
            "UI components are exposed directly without encapsulation. You have full control on UI elements.",
    },
    {
        src: "/icons/features/box.png",
        srcset: "/icons/features/box@2x.png 768w",
        title: "Out-of-the-box",
        description:
            "Routing, networking, authentication, state management, i18n and UI.",
    },
    {
        src: "/icons/features/powerful.png",
        srcset: "/icons/features/powerful@2x.png 768w",
        title: "Powerful Default UI",
        description:
            "Works seamlessly with integrated Ant Design System. (Support for multiple UI frameworks is on the Roadmap)",
    },
    {
        src: "/icons/features/native.png",
        srcset: "/icons/features/native@2x.png 768w",
        title: "Native Typescript Core",
        description: "You can always opt out for plain Javascript.",
    },
    {
        src: "/icons/features/boilerplate.png",
        srcset: "/icons/features/boilerplate@2x.png 768w",
        title: "Boilerplate-free Code",
        description: "Keeps your codebase clean and readable.",
    },
];

export const KeyFeatures = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.mainTitle}>
                    Your API is supported, out of the box!
                </h2>
                <p className={styles.description}>
                    Connects to{" "}
                    <strong>
                        any{" "}
                        <a
                            href="https://github.com/pankod/refine/tree/master/packages/simple-rest"
                            target="_blank"
                            rel="noreferrer"
                        >
                            REST
                        </a>{" "}
                        or{" "}
                        <a
                            href="https://github.com/pankod/refine/tree/master/packages/graphql"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GraphQL
                        </a>{" "}
                    </strong>{" "}
                    custom backend.
                    <br />
                    <br />
                    Built-in support for <br />
                    <a
                        href="https://github.com/nestjsx/crud"
                        target="_blank"
                        rel="noreferrer"
                    >
                        NestJs CRUD
                    </a>
                    ,{" "}
                    <a
                        href="https://airtable.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Airtable
                    </a>
                    ,{" "}
                    <a
                        href="https://strapi.io"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Strapi
                    </a>
                    ,{" "}
                    <a
                        href="https://strapi.io/documentation/developer-docs/latest/development/plugins/graphql.html"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Strapi GraphQL
                    </a>
                    ,{" "}
                    <a
                        href="https://supabase.io/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Supabase
                    </a>{" "}
                    and{" "}
                    <a
                        href="https://altogic.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Altogic
                    </a>
                    .
                </p>
                <div className="row row--justify--center">
                    <div className="col col--6">
                        <div className={styles.supportContainer}>
                            {backends.map((imgGroup, index) => (
                                <div
                                    key={`img-group-${index}`}
                                    className={styles.imgGroup}
                                >
                                    {imgGroup.map(({ src, srcset, alt }) => (
                                        <img
                                            key={alt}
                                            src={src}
                                            srcSet={srcset}
                                            alt={alt}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col col--10">
                        <h2 className={styles.mainFeatureTitle}>
                            Other key features
                        </h2>
                        <div className={styles.featuresContainer}>
                            {features.map(
                                (
                                    { srcset, src, title, description },
                                    index,
                                ) => (
                                    <div
                                        className={styles.feature}
                                        key={`backend-${index}`}
                                    >
                                        <img
                                            srcSet={srcset}
                                            src={src}
                                            alt={title}
                                        />
                                        <div>
                                            <p className={styles.featureTitle}>
                                                {title}
                                            </p>
                                            <p>{description}</p>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
