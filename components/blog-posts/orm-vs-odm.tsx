import React from 'react';

export function OrmVsOdmContent() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <p className="lead">
        When building modern web applications, choosing the right data mapping strategy is crucial for your application's performance and maintainability.
      </p>

      <h2>What is ORM?</h2>
      <p>
        Object-Relational Mapping (ORM) is a technique that lets you query and manipulate data from a database using an object-oriented paradigm. Instead of writing raw SQL queries, you work with objects that represent your data.
      </p>

      <h2>What is ODM?</h2>
      <p>
        Object-Document Mapping (ODM) is similar to ORM but is specifically designed for document databases like MongoDB. It provides a way to model your application data and define schemas for documents.
      </p>

      <h2>Key Differences</h2>
      <ul>
        <li>Data Structure: ORMs work with structured, relational data, while ODMs work with flexible, document-based data</li>
        <li>Schema: ORMs require strict schemas, ODMs offer more flexibility</li>
        <li>Relationships: ORMs handle relationships through foreign keys, ODMs through document embedding or references</li>
      </ul>
    </article>
  );
}