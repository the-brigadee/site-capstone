\echo 'Delete and recreate reciholic db?'
\prompt 'Return for yes or control-c to cancel > ' answer

DROP DATABASE reciholic;
CREATE DATABASE reciholic;
\connect reciholic;

\i reciholic-schema.sql