import React from 'react';

export function IamPermissionsContent() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <p className="lead">
        Understanding IAM permissions is crucial for maintaining secure and well-organized cloud infrastructure.
      </p>

      <h2>What is IAM?</h2>
      <p>
        Identity and Access Management (IAM) is a framework that enables you to manage digital identities and their access to various resources and services.
      </p>

      <h2>Key Components</h2>
      <ul>
        <li>Users: Individual entities that need access to your resources</li>
        <li>Groups: Collections of users with similar access requirements</li>
        <li>Roles: Sets of permissions that can be assumed by users or services</li>
        <li>Policies: Documents that define permissions</li>
      </ul>

      <h2>Best Practices</h2>
      <p>
        Follow the principle of least privilege, use groups for better management, and regularly audit access patterns.
      </p>
    </article>
  );
}