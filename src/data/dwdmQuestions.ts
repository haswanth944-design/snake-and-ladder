import { Question } from '../types/game';

export const DWDM_QUESTIONS: Question[] = [
  // --- TOPIC 1: Data Warehousing Fundamentals & Architecture (1-15) ---
  {
    id: 1,
    topic: 'Data Warehousing Fundamentals',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'According to W.H. Inmon, which of the following is NOT one of the four key characteristics of a Data Warehouse?',
    options: ['Subject-oriented', 'Integrated', 'Volatile', 'Time-variant'],
    correctAnswer: 'Volatile',
    explanation: 'A data warehouse is Non-volatile, meaning data is loaded and accessed, but not overwritten or deleted under regular operational activity.'
  },
  {
    id: 2,
    topic: 'Data Warehouse Architecture',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'In a three-tier data warehouse architecture, what does the middle tier typically consist of?',
    options: ['Relational database server', 'OLAP server', 'Front-end client tools', 'ETL staging files'],
    correctAnswer: 'OLAP server',
    explanation: 'The bottom tier is a relational database server, the middle tier is an OLAP server (ROLAP or MOLAP), and the top tier consists of front-end client query/reporting tools.'
  },
  {
    id: 3,
    topic: 'Data Warehousing Fundamentals',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What is a "Data Mart"?',
    options: [
      'A software store selling analytics algorithms',
      'A subset of a data warehouse focused on a specific department or business area',
      'A backup tape archive for historical transaction logs',
      'An uncleaned repository of raw external logs'
    ],
    correctAnswer: 'A subset of a data warehouse focused on a specific department or business area',
    explanation: 'A data mart contains a subset of corporate-wide data that is of value to a specific group of users or business function (e.g., Marketing or Finance).'
  },
  {
    id: 4,
    topic: 'Data Warehouse Architecture',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What distinguishes an enterprise warehouse from a virtual warehouse?',
    options: [
      'A virtual warehouse is a set of views over operational databases rather than physically materialized storage',
      'An enterprise warehouse cannot store historical records',
      'A virtual warehouse only operates offline using magnetic tape',
      'An enterprise warehouse is always decentralized without schema control'
    ],
    correctAnswer: 'A virtual warehouse is a set of views over operational databases rather than physically materialized storage',
    explanation: 'A virtual warehouse is composed of a collection of views over operational databases without requiring separate physical materialization.'
  },
  {
    id: 5,
    topic: 'Data Warehouse Architecture',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is metadata in the context of a data warehouse?',
    options: [
      'Data that describes data warehouse objects, mappings, algorithms, and business definitions',
      'Encrypted user passwords and network sockets',
      'Temporary cache files created during SQL sorting',
      'The raw unstructured text scraped from social media'
    ],
    correctAnswer: 'Data that describes data warehouse objects, mappings, algorithms, and business definitions',
    explanation: 'Metadata defines warehouse structure, source-to-target mappings, aggregation algorithms, refresh rules, and business definitions.'
  },

  // --- TOPIC 2: OLTP vs OLAP (6-16) ---
  {
    id: 6,
    topic: 'OLTP vs OLAP',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'Which workload characteristics best represent an OLTP system compared to an OLAP system?',
    options: [
      'Historical queries over terabytes of summarized records',
      'Frequent, short atomic transactions updating current data',
      'Complex multidimensional slice-and-dice aggregations',
      'Read-heavy ad-hoc predictive modeling sessions'
    ],
    correctAnswer: 'Frequent, short atomic transactions updating current data',
    explanation: 'OLTP (Online Transaction Processing) is optimized for day-to-day operations with high concurrency, quick inserts/updates, and normalized schemas.'
  },
  {
    id: 7,
    topic: 'OLTP vs OLAP',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'In database modeling, what level of normalization is typically favored for OLAP systems versus OLTP systems?',
    options: [
      'OLAP favors denormalization (star/snowflake); OLTP favors 3NF normalization',
      'OLAP requires BCNF; OLTP requires 1NF',
      'Both OLAP and OLTP strictly mandate 5NF',
      'OLAP strictly forbids dimensional modeling'
    ],
    correctAnswer: 'OLAP favors denormalization (star/snowflake); OLTP favors 3NF normalization',
    explanation: 'OLTP emphasizes 3NF to prevent write anomalies, while OLAP emphasizes denormalization to minimize expensive multi-table joins during complex analytical queries.'
  },
  {
    id: 8,
    topic: 'OLTP vs OLAP',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'Which OLAP server architecture stores multidimensional data directly in specialized array-based data structures?',
    options: ['ROLAP (Relational OLAP)', 'MOLAP (Multidimensional OLAP)', 'HOLAP (Hybrid OLAP)', 'DOLAP (Desktop OLAP)'],
    correctAnswer: 'MOLAP (Multidimensional OLAP)',
    explanation: 'MOLAP stores data in optimized multidimensional array cubes, providing fast response times through pre-computed cells.'
  },
  {
    id: 9,
    topic: 'OLTP vs OLAP',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is the primary operational trade-off of MOLAP compared to ROLAP?',
    options: [
      'MOLAP query performance is fast, but it suffers from data sparsity and longer build times',
      'MOLAP cannot perform slice-and-dice operations',
      'ROLAP stores data in physical multidimensional arrays instead of tables',
      'MOLAP uses standard SQL queries directly on production tables'
    ],
    correctAnswer: 'MOLAP query performance is fast, but it suffers from data sparsity and longer build times',
    explanation: 'MOLAP provides blazing aggregation query speeds, but pre-calculating sparse multidimensional arrays requires significant storage and cubing build time.'
  },
  {
    id: 10,
    topic: 'OLTP vs OLAP',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'How does Hybrid OLAP (HOLAP) balance storage and query efficiency?',
    options: [
      'It stores detailed low-level data in relational tables and pre-computed summaries in multidimensional arrays',
      'It completely removes dimension tables',
      'It executes queries only on memory cache without disk writes',
      'It replaces relational databases with key-value document stores'
    ],
    correctAnswer: 'It stores detailed low-level data in relational tables and pre-computed summaries in multidimensional arrays',
    explanation: 'HOLAP combines ROLAP and MOLAP: large volume detailed base records remain in relational stores, while high-level aggregations reside in MOLAP cubes.'
  },

  // --- TOPIC 3: Data Warehouse Schemas (11-25) ---
  {
    id: 11,
    topic: 'Data Warehouse Schemas',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'In a Star Schema, what constitutes the central table surrounded by dimension tables?',
    options: ['Fact Table', 'Lookup Table', 'Staging Table', 'Bridge Table'],
    correctAnswer: 'Fact Table',
    explanation: 'A Star Schema consists of a single centralized Fact table containing numerical measures and foreign keys pointing to surrounding Dimension tables.'
  },
  {
    id: 12,
    topic: 'Data Warehouse Schemas',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'How does a Snowflake Schema differ primarily from a Star Schema?',
    options: [
      'A Snowflake Schema normalizes dimension tables into hierarchies, creating sub-dimension tables',
      'A Snowflake Schema has no fact table',
      'A Snowflake Schema permits only two dimensions per cube',
      'A Snowflake Schema completely prohibits foreign key relationships'
    ],
    correctAnswer: 'A Snowflake Schema normalizes dimension tables into hierarchies, creating sub-dimension tables',
    explanation: 'In a snowflake schema, dimension tables are normalized to reduce redundancy, splitting hierarchies (e.g., item -> category -> department) into linked tables.'
  },
  {
    id: 13,
    topic: 'Data Warehouse Schemas',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is a "Fact Constellation Schema" (also known as a Galaxy Schema)?',
    options: [
      'A schema with multiple fact tables sharing conformed dimension tables',
      'A schema where all fact tables are stored in flat CSV files',
      'A schema that contains only dimensions without any numerical measures',
      'A schema that models strictly graph relationships between entities'
    ],
    correctAnswer: 'A schema with multiple fact tables sharing conformed dimension tables',
    explanation: 'A fact constellation (galaxy) schema contains multiple fact tables sharing conformed dimension tables across business processes (e.g., Sales and Shipping sharing Customer and Time dimensions).'
  },
  {
    id: 14,
    topic: 'Data Warehouse Schemas',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is a "Conformed Dimension"?',
    options: [
      'A dimension that has the exact same meaning, attributes, and keys across multiple fact tables',
      'A dimension that cannot have more than 100 records',
      'A dimension that is only created at query runtime in RAM',
      'A fact table that has been converted into a relational view'
    ],
    correctAnswer: 'A dimension that has the exact same meaning, attributes, and keys across multiple fact tables',
    explanation: 'Conformed dimensions share identical structure and content across disparate business processes, ensuring enterprise-wide consistency for cross-functional drill-across queries.'
  },
  {
    id: 15,
    topic: 'Data Warehouse Schemas',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'Which type of measure can be summed across all dimensions without logical restriction?',
    options: ['Additive measure', 'Semi-additive measure', 'Non-additive measure', 'Holistic measure'],
    correctAnswer: 'Additive measure',
    explanation: 'Additive measures (such as sales amount or quantity sold) can be meaningfully summed across all dimensions (Time, Store, Product).'
  },
  {
    id: 16,
    topic: 'Data Warehouse Schemas',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'An account balance recorded at the end of each day is an example of which kind of measure?',
    options: ['Semi-additive measure', 'Additive measure', 'Non-additive measure', 'Distributive measure'],
    correctAnswer: 'Semi-additive measure',
    explanation: 'Account balances can be summed across accounts or branches, but NOT across the Time dimension (adding balances across 30 days makes no economic sense).'
  },
  {
    id: 17,
    topic: 'Data Warehouse Schemas',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is a "Factless Fact Table"?',
    options: [
      'A fact table that captures events or coverage conditions and contains foreign keys but no numeric measure metrics',
      'A fact table that has corrupted records',
      'A dimension table mistaken for a transaction log',
      'A virtual table created without any primary key'
    ],
    correctAnswer: 'A fact table that captures events or coverage conditions and contains foreign keys but no numeric measure metrics',
    explanation: 'Factless fact tables record events (such as student class attendance or product promotion coverage) containing keys to dimensions, but no numeric measures except the implicit count.'
  },
  {
    id: 18,
    topic: 'Data Warehouse Schemas',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'In dimensional modeling, which Slowly Changing Dimension (SCD) type overwrites existing attribute values without preserving historical changes?',
    options: ['Type 1 SCD', 'Type 2 SCD', 'Type 3 SCD', 'Type 0 SCD'],
    correctAnswer: 'Type 1 SCD',
    explanation: 'SCD Type 1 simply updates the old record in place with new values, keeping no historical tracking of previous states.'
  },
  {
    id: 19,
    topic: 'Data Warehouse Schemas',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'Which SCD technique creates a new row with new surrogate keys and effective date ranges (start_date, end_date, is_current)?',
    options: ['Type 2 SCD', 'Type 1 SCD', 'Type 3 SCD', 'Type 4 SCD'],
    correctAnswer: 'Type 2 SCD',
    explanation: 'SCD Type 2 preserves complete history by adding a new record with versioning columns (start timestamp, end timestamp, and current flag).'
  },

  // --- TOPIC 4: Multidimensional Data Models & OLAP Operations (20-30) ---
  {
    id: 20,
    topic: 'Data Cubes & OLAP Operations',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'Which OLAP operation navigates from less detailed data to more detailed data along a concept hierarchy?',
    options: ['Drill-down', 'Roll-up', 'Slice', 'Pivot'],
    correctAnswer: 'Drill-down',
    explanation: 'Drill-down (or roll-down) steps down a concept hierarchy (e.g., from Year to Quarter to Month) or adds dimensions to expose finer granularity.'
  },
  {
    id: 21,
    topic: 'Data Cubes & OLAP Operations',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'Which OLAP operation performs aggregation by climbing up a concept hierarchy or by dimension reduction?',
    options: ['Roll-up', 'Drill-down', 'Dice', 'Drill-through'],
    correctAnswer: 'Roll-up',
    explanation: 'Roll-up aggregates data by climbing up a hierarchy (e.g., Day -> Month -> Year) or by dropping dimension attributes.'
  },
  {
    id: 22,
    topic: 'Data Cubes & OLAP Operations',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the "Slice" operation in a multidimensional data cube?',
    options: [
      'Selecting a single dimension value to obtain a sub-cube of lower dimensionality',
      'Rotating the display axes to view data from different angles',
      'Selecting a range of values across two or more dimensions',
      'Deleting empty dimension cells'
    ],
    correctAnswer: 'Selecting a single dimension value to obtain a sub-cube of lower dimensionality',
    explanation: 'Slice performs a selection on one dimension of the cube, resulting in a sub-cube (e.g., Time = "Q1 2024").'
  },
  {
    id: 23,
    topic: 'Data Cubes & OLAP Operations',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the "Dice" operation in an OLAP cube?',
    options: [
      'Defining a sub-cube by selecting criteria on two or more dimensions',
      'Generating random numbers for Monte Carlo simulations',
      'Splitting a single dimension table into two normalized tables',
      'Dropping all negative measure values'
    ],
    correctAnswer: 'Defining a sub-cube by selecting criteria on two or more dimensions',
    explanation: 'Dice selects a sub-cube by applying predicate conditions across two or more dimensions simultaneously (e.g., Location in {NY, CA} AND Time in {Q1, Q2}).'
  },
  {
    id: 24,
    topic: 'Data Cubes & OLAP Operations',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What does the "Pivot" (or Rotate) OLAP operation do?',
    options: [
      'Rotates data axes in view to provide an alternative presentation of dimensions',
      'Multiplies all measures by a scaling factor',
      'Transforms a star schema into an operational relational database',
      'Encrypts sensitive sales measures'
    ],
    correctAnswer: 'Rotates data axes in view to provide an alternative presentation of dimensions',
    explanation: 'Pivot rotates the visual presentation axes, converting rows into columns or swapping 3D perspective to reveal different multidimensional angles.'
  },
  {
    id: 25,
    topic: 'Data Cubes & OLAP Operations',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'In data cube terminology, what is a cuboid that holds the highest level of summarization (0-D cuboid)?',
    options: ['Apex cuboid', 'Base cuboid', 'Lattice root', 'Null cuboid'],
    correctAnswer: 'Apex cuboid',
    explanation: 'The apex cuboid represents the 0-D summarization over all dimensions (total aggregated sum of the cube), while the base cuboid is at the lowest granularity (n-D).'
  },
  {
    id: 26,
    topic: 'Data Cubes & OLAP Operations',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'For an n-dimensional data cube with no hierarchies, how many total cuboids exist in its complete lattice of cuboids?',
    options: ['2^n', 'n^2', 'n!', '2n'],
    correctAnswer: '2^n',
    explanation: 'A lattice of cuboids for an n-dimensional cube contains 2^n cuboids, corresponding to all subsets of dimensions.'
  },

  // --- TOPIC 5: ETL Processes (27-36) ---
  {
    id: 27,
    topic: 'ETL Processes',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What does the acronym ETL stand for in Data Warehousing?',
    options: [
      'Extract, Transform, Load',
      'Evaluate, Train, Learn',
      'Encapsulate, Test, Link',
      'Export, Translate, Localize'
    ],
    correctAnswer: 'Extract, Transform, Load',
    explanation: 'ETL stands for Extract (ingest from source systems), Transform (clean, conform, convert, summarize), and Load (populate target warehouse).'
  },
  {
    id: 28,
    topic: 'ETL Processes',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the role of an ETL Staging Area?',
    options: [
      'An intermediate storage area where raw data is landed, cleansed, and transformed before warehouse loading',
      'A permanent public web server hosting user dashboards',
      'A disaster recovery backup hosted on tape cartridges',
      'A sandbox where end-users execute production ad-hoc analytical queries'
    ],
    correctAnswer: 'An intermediate storage area where raw data is landed, cleansed, and transformed before warehouse loading',
    explanation: 'The staging area isolates operational production systems from analytics and holds intermediate data while transformation and data quality checks execute.'
  },
  {
    id: 29,
    topic: 'ETL Processes',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is Change Data Capture (CDC) in data warehousing pipelines?',
    options: [
      'A technique to detect, capture, and deliver only modified source records rather than reloading full tables',
      'A version control system for SQL scripts',
      'An algorithm that renames column headers during schema changes',
      'A backup protocol that snapshots the OS disk weekly'
    ],
    correctAnswer: 'A technique to detect, capture, and deliver only modified source records rather than reloading full tables',
    explanation: 'CDC identifies only newly inserted, updated, or deleted records in source tables, dramatically speeding up incremental ETL pipeline runs.'
  },
  {
    id: 30,
    topic: 'ETL Processes',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'Why are Surrogate Keys preferred over natural operational keys in Data Warehouse dimension tables?',
    options: [
      'They insulate the warehouse from source operational key changes and support SCD historical tracking',
      'They are strings that take up more storage space',
      'They allow end users to modify transaction records directly',
      'They eliminate the need for primary keys'
    ],
    correctAnswer: 'They insulate the warehouse from source operational key changes and support SCD historical tracking',
    explanation: 'Surrogate keys are warehouse-assigned synthetic integers that protect against operational key reassignments, support SCD Type 2 history, and optimize join performance.'
  },

  // --- TOPIC 6: Data Preprocessing & Cleaning (31-45) ---
  {
    id: 31,
    topic: 'Data Preprocessing',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'Why is data preprocessing considered a critical prerequisite before performing data mining?',
    options: [
      'Real-world data is often incomplete, noisy, inconsistent, and massive in dimensionality',
      'Data mining algorithms only work on plain text files',
      'Preprocessing reduces the computer CPU clock speed',
      'Databases cannot execute SELECT queries without it'
    ],
    correctAnswer: 'Real-world data is often incomplete, noisy, inconsistent, and massive in dimensionality',
    explanation: 'Real-world data suffers from missing attributes, noisy sensors, duplicate records, and high dimensionality, leading to garbage-in, garbage-out models.'
  },
  {
    id: 32,
    topic: 'Data Cleaning',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'Which method for handling missing values is most suitable when an attribute is missing at random and follows a normal distribution?',
    options: [
      'Imputing with attribute mean',
      'Dropping the entire dataset',
      'Replacing missing values with 99999',
      'Duplicating the entire row 10 times'
    ],
    correctAnswer: 'Imputing with attribute mean',
    explanation: 'Mean imputation preserves the central tendency for normally distributed continuous attributes without losing sample size.'
  },
  {
    id: 33,
    topic: 'Data Cleaning',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'In binning methods for data smoothing, what does "smoothing by bin means" do?',
    options: [
      'Replaces every value in a bin with the arithmetic mean of that bin',
      'Deletes values that exceed the average',
      'Converts values to alphabetical grades',
      'Sorts values in descending order only'
    ],
    correctAnswer: 'Replaces every value in a bin with the arithmetic mean of that bin',
    explanation: 'Smoothing by bin means sorts the data into buckets and replaces all values in each bin with that bin\'s average, effectively damping random noise.'
  },
  {
    id: 34,
    topic: 'Data Cleaning',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is "smoothing by bin boundaries"?',
    options: [
      'Each value in a bin is replaced by whichever bin boundary (minimum or maximum) it is closest to',
      'Bin boundaries are expanded to infinity',
      'Values inside bins are multiplied by the boundary threshold',
      'All bins are merged into a single boundary'
    ],
    correctAnswer: 'Each value in a bin is replaced by whichever bin boundary (minimum or maximum) it is closest to',
    explanation: 'In boundary smoothing, the minimum and maximum values of a bin form the boundary extremes, and each point is replaced by its nearest boundary.'
  },
  {
    id: 35,
    topic: 'Data Transformation',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the formula for Min-Max normalization mapping a value v to [new_min, new_max]?',
    options: [
      '[(v - min) / (max - min)] * (new_max - new_min) + new_min',
      '(v - mean) / standard_deviation',
      'v / 10^j where j is the number of digits',
      '(v * max) / min'
    ],
    correctAnswer: '[(v - min) / (max - min)] * (new_max - new_min) + new_min',
    explanation: 'Min-Max normalization scales values linearly into a specified range [new_min, new_max] using this standard formula.'
  },
  {
    id: 36,
    topic: 'Data Transformation',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What is Z-score normalization (standardization)?',
    options: [
      'v\' = (v - mean) / standard_deviation',
      'v\' = (v - min) / (max - min)',
      'v\' = v / 100',
      'v\' = log(v)'
    ],
    correctAnswer: 'v\' = (v - mean) / standard_deviation',
    explanation: 'Z-score normalization transforms data so that the resulting feature has a mean of 0 and a standard deviation of 1.'
  },
  {
    id: 37,
    topic: 'Data Transformation',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'When is Z-score normalization strongly preferred over Min-Max normalization?',
    options: [
      'When the data contains extreme outliers that would distort minimum and maximum boundaries',
      'When all numbers are positive integers between 0 and 10',
      'When the data consists entirely of binary categorical labels',
      'When running only SQL count queries'
    ],
    correctAnswer: 'When the data contains extreme outliers that would distort minimum and maximum boundaries',
    explanation: 'Outliers compress normal Min-Max ranges into tiny clusters, whereas Z-score standardization scales data robustly relative to mean and variance.'
  },
  {
    id: 38,
    topic: 'Data Reduction',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is the goal of Principal Component Analysis (PCA)?',
    options: [
      'Linear transformation that projects high-dimensional data onto orthogonal axes of maximum variance',
      'Clustering customers into demographic segments',
      'Finding association rules with high lift',
      'Pruning branches from a classification decision tree'
    ],
    correctAnswer: 'Linear transformation that projects high-dimensional data onto orthogonal axes of maximum variance',
    explanation: 'PCA reduces dimensionality while retaining as much variance as possible by computing eigenvectors and eigenvalues of the data covariance matrix.'
  },
  {
    id: 39,
    topic: 'Data Reduction',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the difference between supervised and unsupervised discretization?',
    options: [
      'Supervised discretization uses class label information (e.g., entropy-based); unsupervised does not (e.g., equal-width)',
      'Supervised discretization runs only on GPU',
      'Unsupervised discretization requires manual teacher intervention',
      'Supervised discretization deletes categorical columns'
    ],
    correctAnswer: 'Supervised discretization uses class label information (e.g., entropy-based); unsupervised does not (e.g., equal-width)',
    explanation: 'Supervised methods (like entropy-based splitting) utilize class labels to create optimal boundary splits; unsupervised methods (equal-width/equal-frequency) operate purely on attribute intervals.'
  },

  // --- TOPIC 7: Data Mining Concepts & Tasks (40-50) ---
  {
    id: 40,
    topic: 'Data Mining Concepts',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What is Data Mining (also known as Knowledge Discovery in Databases - KDD)?',
    options: [
      'The non-trivial extraction of implicit, previously unknown, and potentially useful patterns from data',
      'Extracting minerals and computer chips from electronic waste',
      'Encrypting database files on a hard drive',
      'Writing SQL joins between relational tables'
    ],
    correctAnswer: 'The non-trivial extraction of implicit, previously unknown, and potentially useful patterns from data',
    explanation: 'Data mining is the core algorithmic phase of KDD discovering novel, valid, useful, and understandable patterns in massive data collections.'
  },
  {
    id: 41,
    topic: 'Data Mining Concepts',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'Which of the following is classified as a "descriptive" data mining task rather than a "predictive" task?',
    options: ['Clustering', 'Classification', 'Time-series forecasting', 'Regression'],
    correctAnswer: 'Clustering',
    explanation: 'Descriptive mining (clustering, association rules, summarization) uncovers intrinsic patterns without predefined target classes. Classification and regression are predictive.'
  },
  {
    id: 42,
    topic: 'Data Mining Concepts',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the key difference between Classification and Regression in data mining?',
    options: [
      'Classification predicts discrete categorical class labels; Regression predicts continuous numerical values',
      'Classification requires unsupervised clustering; Regression requires text parsing',
      'Classification cannot be evaluated with test data; Regression has no error metrics',
      'Classification applies only to time-series datasets'
    ],
    correctAnswer: 'Classification predicts discrete categorical class labels; Regression predicts continuous numerical values',
    explanation: 'Classification predicts discrete categorical labels (e.g., Spam/Ham, Fraud/Normal), whereas regression estimates continuous numeric variables (e.g., House Price, Stock Value).'
  },

  // --- TOPIC 8: Classification & Decision Trees (51-68) ---
  {
    id: 43,
    topic: 'Classification & Decision Trees',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'In a decision tree, what does an internal node (non-leaf node) represent?',
    options: ['A test on an attribute', 'A class label decision', 'The final predictive probability', 'An outlier record'],
    correctAnswer: 'A test on an attribute',
    explanation: 'Internal nodes represent tests on specific attributes, branches represent test outcomes, and leaf nodes represent predicted class labels.'
  },
  {
    id: 44,
    topic: 'Classification & Decision Trees',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What formula defines Entropy H(S) for a binary classification dataset with probabilities p+ and p-?',
    options: [
      '- p+ log2(p+) - p- log2(p-)',
      '1 - (p+)^2 - (p-)^2',
      '(p+ * p-) / 2',
      'p+ + p-'
    ],
    correctAnswer: '- p+ log2(p+) - p- log2(p-)',
    explanation: 'Information entropy measures impurity: H(S) = - sum(p_i * log2(p_i)). For completely homogeneous data, entropy is 0.'
  },
  {
    id: 45,
    topic: 'Classification & Decision Trees',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'Which decision tree induction algorithm uses "Information Gain" based on Shannon entropy as its attribute selection measure?',
    options: ['ID3', 'CART', 'Linear Regression', 'K-Means'],
    correctAnswer: 'ID3',
    explanation: 'Quinlan\'s ID3 algorithm uses Information Gain to select the attribute that best splits data at each node.'
  },
  {
    id: 46,
    topic: 'Classification & Decision Trees',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'Why did C4.5 introduce "Gain Ratio" instead of pure Information Gain?',
    options: [
      'Information Gain is biased toward selecting attributes with numerous distinct values (e.g., unique IDs)',
      'Information Gain cannot handle numeric targets',
      'Information Gain causes trees to have only one leaf',
      'Gain Ratio runs in constant time O(1)'
    ],
    correctAnswer: 'Information Gain is biased toward selecting attributes with numerous distinct values (e.g., unique IDs)',
    explanation: 'Attributes with many values (like Student_ID) yield high information gain trivially; Gain Ratio normalizes this using Split Information.'
  },
  {
    id: 47,
    topic: 'Classification & Decision Trees',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'Which impurity metric is used by the CART (Classification and Regression Trees) algorithm?',
    options: ['Gini Index', 'Information Gain', 'Gain Ratio', 'Cosine Dissimilarity'],
    correctAnswer: 'Gini Index',
    explanation: 'CART uses the Gini Index: Gini(D) = 1 - sum(p_i^2), which measures the probability of a randomly chosen element being incorrectly labeled.'
  },
  {
    id: 48,
    topic: 'Classification & Decision Trees',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is the purpose of "Tree Pruning" in decision tree induction?',
    options: [
      'To prevent overfitting by removing subtrees that model noise in the training data',
      'To force all leaf nodes to have equal counts',
      'To convert multiway trees into linear regression formulas',
      'To delete the root node if it has high entropy'
    ],
    correctAnswer: 'To prevent overfitting by removing subtrees that model noise in the training data',
    explanation: 'Overfitting occurs when trees grow overly complex by fitting noise; pre-pruning or post-pruning trims branches to improve generalization on unseen test data.'
  },
  {
    id: 49,
    topic: 'Classification: Naive Bayes',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What fundamental "naive" assumption is made by the Naive Bayes classifier?',
    options: [
      'All features are conditionally independent of each other given the class label',
      'All continuous variables follow a uniform distribution between 0 and 1',
      'Training data contains zero missing values or outliers',
      'The target variable is strictly continuous'
    ],
    correctAnswer: 'All features are conditionally independent of each other given the class label',
    explanation: 'Naive Bayes assumes that the presence of a particular feature in a class is unrelated to the presence of any other feature given the class label (class-conditional independence).'
  },
  {
    id: 50,
    topic: 'Classification: Naive Bayes',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'Why is Laplace correction (Laplace smoothing) applied in Naive Bayes classification?',
    options: [
      'To prevent zero-probability values from nullifying the entire posterior probability product',
      'To normalize features between -1 and +1',
      'To speed up floating point calculations',
      'To convert categorical labels into numeric vectors'
    ],
    correctAnswer: 'To prevent zero-probability values from nullifying the entire posterior probability product',
    explanation: 'If a feature never appears with a class in the training set, its conditional probability is 0, which zeroes out the whole product. Adding 1 (Laplace smoothing) solves this zero-frequency problem.'
  },

  // --- TOPIC 9: Association Rules & Apriori Algorithm (51-70) ---
  {
    id: 51,
    topic: 'Association Rules',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'In market basket analysis, what is the definition of "Support" for an association rule A -> B?',
    options: [
      'The percentage of transactions containing both itemset A and itemset B',
      'The conditional probability P(B|A)',
      'The ratio of confidence to expected confidence',
      'The total number of items sold in the store'
    ],
    correctAnswer: 'The percentage of transactions containing both itemset A and itemset B',
    explanation: 'Support(A -> B) = count(A U B) / total_transactions. It measures how frequently items A and B appear together.'
  },
  {
    id: 52,
    topic: 'Association Rules',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What is the formula for "Confidence" in an association rule A -> B?',
    options: [
      'Support(A U B) / Support(A)',
      'Support(A U B) / Support(B)',
      'Support(A) * Support(B)',
      'Support(A) + Support(B)'
    ],
    correctAnswer: 'Support(A U B) / Support(A)',
    explanation: 'Confidence(A -> B) = P(B|A) = Support(A U B) / Support(A). It represents how frequently B appears in transactions containing A.'
  },
  {
    id: 53,
    topic: 'Association Rules',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What does a Lift value greater than 1 (Lift > 1) indicate for rule A -> B?',
    options: [
      'Positive correlation: occurrence of A increases the likelihood of occurrence of B',
      'Negative correlation: occurrence of A discourages the purchase of B',
      'Independence: A and B have zero relationship',
      'The rule violates minimum support threshold'
    ],
    correctAnswer: 'Positive correlation: occurrence of A increases the likelihood of occurrence of B',
    explanation: 'Lift = Confidence(A -> B) / Support(B). Lift > 1 indicates positive correlation; Lift = 1 indicates independence; Lift < 1 indicates negative correlation.'
  },
  {
    id: 54,
    topic: 'Apriori Algorithm',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the "Apriori Property" (Downward Closure property of support)?',
    options: [
      'All non-empty subsets of a frequent itemset must also be frequent',
      'All supersets of an infrequent itemset are frequent',
      'Confidence increases monotonically with itemset size',
      'The support of a union is equal to the product of individual supports'
    ],
    correctAnswer: 'All non-empty subsets of a frequent itemset must also be frequent',
    explanation: 'The Apriori property states that if an itemset is frequent, all of its subsets must be frequent. Conversely, if an itemset is infrequent, any superset is immediately pruned.'
  },
  {
    id: 55,
    topic: 'Apriori Algorithm',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'If itemset {Bread, Butter} is found to be infrequent in a database, what does the Apriori algorithm do with candidate {Bread, Butter, Jam}?',
    options: [
      'Immediately prunes {Bread, Butter, Jam} without scanning the database',
      'Calculates its confidence using Bayes rule',
      'Scans the entire database twice to verify its support',
      'Converts it into a negative association rule'
    ],
    correctAnswer: 'Immediately prunes {Bread, Butter, Jam} without scanning the database',
    explanation: 'Because a subset {Bread, Butter} is infrequent, any superset containing it cannot be frequent by the Apriori downward closure property, enabling massive search space pruning.'
  },
  {
    id: 56,
    topic: 'Association Rules',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is a "Maximal Frequent Itemset"?',
    options: [
      'A frequent itemset that has no frequent proper superset',
      'A frequent itemset where all items cost the maximum price',
      'An itemset having support equal to 100%',
      'The itemset with the highest confidence among all rules'
    ],
    correctAnswer: 'A frequent itemset that has no frequent proper superset',
    explanation: 'An itemset is maximal frequent if it satisfies minimum support and none of its immediate supersets are frequent.'
  },
  {
    id: 57,
    topic: 'Association Rules',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is a "Closed Frequent Itemset"?',
    options: [
      'A frequent itemset that has no proper superset with the exact same support count',
      'An itemset that has zero support',
      'An itemset that contains only binary attributes',
      'An itemset that cannot generate any valid rules'
    ],
    correctAnswer: 'A frequent itemset that has no proper superset with the exact same support count',
    explanation: 'An itemset X is closed if there exists no proper superset Y such that Support(Y) == Support(X). Closed itemsets provide a lossless representation of all frequent itemsets.'
  },
  {
    id: 58,
    topic: 'Association Rules',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'How does the FP-Growth (Frequent Pattern Growth) algorithm improve upon Apriori?',
    options: [
      'It mines frequent itemsets without candidate generation by using a compact tree structure (FP-Tree)',
      'It uses deep neural networks to compute gradient descent',
      'It eliminates the need for a minimum support parameter',
      'It runs only on SQL databases without requiring RAM'
    ],
    correctAnswer: 'It mines frequent itemsets without candidate generation by using a compact tree structure (FP-Tree)',
    explanation: 'FP-growth compresses transactions into an FP-tree and recursively extracts frequent patterns, avoiding costly iterative candidate generation and multiple full database scans.'
  },

  // --- TOPIC 10: Clustering Algorithms (59-75) ---
  {
    id: 59,
    topic: 'Clustering',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What is the objective of Clustering in data mining?',
    options: [
      'Partitioning data into groups where intra-cluster similarity is high and inter-cluster similarity is low',
      'Predicting a discrete target class label for unseen test instances',
      'Computing the inverse matrix of a relational schema',
      'Normalizing table columns to First Normal Form'
    ],
    correctAnswer: 'Partitioning data into groups where intra-cluster similarity is high and inter-cluster similarity is low',
    explanation: 'Clustering is unsupervised learning grouping similar data points together while ensuring distinct clusters are well-separated.'
  },
  {
    id: 60,
    topic: 'Clustering: K-Means',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'In the K-Means algorithm, what does the parameter "K" represent?',
    options: [
      'The predefined number of clusters to form',
      'The number of iterations before convergence',
      'The learning rate multiplier',
      'The maximum dimensionality of features'
    ],
    correctAnswer: 'The predefined number of clusters to form',
    explanation: 'K-Means requires specifying the number of clusters K upfront as an input parameter.'
  },
  {
    id: 61,
    topic: 'Clustering: K-Means',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'How are cluster centroids updated in standard K-Means after assigning points to the nearest center?',
    options: [
      'By calculating the mean coordinates of all data points assigned to that cluster',
      'By selecting a random point from the outer edge',
      'By computing the median along the first principal component',
      'Centroids are fixed and never update'
    ],
    correctAnswer: 'By calculating the mean coordinates of all data points assigned to that cluster',
    explanation: 'Centroids are recalculated as the center of mass (arithmetic mean) of all points currently assigned to each cluster.'
  },
  {
    id: 62,
    topic: 'Clustering: K-Means',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'Which method is commonly used to help select an optimal value for K in K-Means clustering?',
    options: ['The Elbow Method', 'The Gini Split', 'The Laplace Correction', 'The Apriori Property'],
    correctAnswer: 'The Elbow Method',
    explanation: 'The Elbow Method plots the Within-Cluster Sum of Squares (WCSS) against K, looking for the point where the rate of decrease abruptly bends (resembling an elbow).'
  },
  {
    id: 63,
    topic: 'Clustering: K-Means',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'Why is standard K-Means sensitive to outliers and extreme values?',
    options: [
      'The arithmetic mean used for updating centroids is heavily pulled by distant outliers',
      'Outliers cause division by zero in distance metrics',
      'K-Means automatically creates a new cluster for every outlier',
      'The algorithm only processes integer values'
    ],
    correctAnswer: 'The arithmetic mean used for updating centroids is heavily pulled by distant outliers',
    explanation: 'Because centroids are computed via means (which minimize squared Euclidean distance), extreme outlier points significantly distort cluster positions.'
  },
  {
    id: 64,
    topic: 'Clustering: K-Medoids',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'How does K-Medoids (PAM - Partitioning Around Medoids) differ from K-Means?',
    options: [
      'Centroids are actual representative objects from the dataset rather than computed mean points',
      'It cannot use distance functions',
      'It is strictly hierarchical and does not use clusters',
      'It only clusters single-attribute records'
    ],
    correctAnswer: 'Centroids are actual representative objects from the dataset rather than computed mean points',
    explanation: 'K-Medoids uses actual data points (medoids) as cluster centers, making it substantially more robust to noise and outliers than K-Means.'
  },
  {
    id: 65,
    topic: 'Hierarchical Clustering',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the graphical tree diagram used to illustrate the arrangement of clusters in hierarchical clustering called?',
    options: ['Dendrogram', 'Histogram', 'Scatter plot', 'ROC Curve'],
    correctAnswer: 'Dendrogram',
    explanation: 'A dendrogram is a tree diagram showing the taxonomic relationships and fusion distances at which clusters are merged or split.'
  },
  {
    id: 66,
    topic: 'Hierarchical Clustering',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the difference between Agglomerative and Divisive hierarchical clustering?',
    options: [
      'Agglomerative is bottom-up (starts with individual points and merges); Divisive is top-down (starts with one cluster and splits)',
      'Agglomerative is supervised; Divisive is unsupervised',
      'Agglomerative uses decision trees; Divisive uses neural networks',
      'There is no difference; they are identical algorithms'
    ],
    correctAnswer: 'Agglomerative is bottom-up (starts with individual points and merges); Divisive is top-down (starts with one cluster and splits)',
    explanation: 'Agglomerative clustering starts with each point in its own cluster and recursively merges the closest pairs. Divisive starts with all objects in one cluster and recursively splits them.'
  },
  {
    id: 67,
    topic: 'Hierarchical Clustering',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'In agglomerative clustering, what is "Single Linkage" (minimum distance)?',
    options: [
      'Distance between two clusters is the minimum distance between any single point in cluster A and any single point in cluster B',
      'Distance between cluster centroids',
      'Maximum distance between any pair of points in the two clusters',
      'Average distance across all possible cross-cluster point pairs'
    ],
    correctAnswer: 'Distance between two clusters is the minimum distance between any single point in cluster A and any single point in cluster B',
    explanation: 'Single linkage defines cluster distance as the shortest distance between any object in cluster 1 and any object in cluster 2 (often leading to chaining effects).'
  },
  {
    id: 68,
    topic: 'Density-Based Clustering',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'In DBSCAN (Density-Based Spatial Clustering of Applications with Noise), what defines a "Core Point"?',
    options: [
      'A point having at least MinPts neighbor points within an Eps (epsilon) radius neighborhood',
      'The arithmetic mean of all coordinates in the dataset',
      'A point lying exactly on the cluster perimeter',
      'A point with zero neighbors'
    ],
    correctAnswer: 'A point having at least MinPts neighbor points within an Eps (epsilon) radius neighborhood',
    explanation: 'In DBSCAN, a point is a core point if the number of points within its Eps-neighborhood is greater than or equal to MinPts.'
  },

  // --- TOPIC 11: Outlier Analysis (69-76) ---
  {
    id: 69,
    topic: 'Outlier Analysis',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What is an "Outlier" in data mining?',
    options: [
      'A data point that deviates significantly from the remaining data, arousing suspicion that it was generated by a different mechanism',
      'The most frequently occurring value in a column',
      'A record containing null values in all foreign keys',
      'A node that was pruned from a decision tree'
    ],
    correctAnswer: 'A data point that deviates significantly from the remaining data, arousing suspicion that it was generated by a different mechanism',
    explanation: 'Hawkins defines an outlier as an observation which deviates so much from other observations as to arouse suspicions that it was generated by a different mechanism.'
  },
  {
    id: 70,
    topic: 'Outlier Analysis',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'In a boxplot, which mathematical rule defines an observation as a potential outlier?',
    options: [
      'Values smaller than Q1 - 1.5*IQR or greater than Q3 + 1.5*IQR',
      'Values beyond the median +/- 1 standard deviation',
      'Any value that is a negative number',
      'Values greater than the mean * 2'
    ],
    correctAnswer: 'Values smaller than Q1 - 1.5*IQR or greater than Q3 + 1.5*IQR',
    explanation: 'Tukey\'s rule marks data points below Q1 - 1.5*IQR or above Q3 + 1.5*IQR (where IQR = Q3 - Q1) as potential outliers.'
  },
  {
    id: 71,
    topic: 'Outlier Analysis',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is LOF (Local Outlier Factor)?',
    options: [
      'A density-based outlier detection algorithm that compares local density of an object against that of its k-nearest neighbors',
      'A linear regression outlier threshold formula',
      'A metric that measures how many dimensions are missing',
      'A measure used in market basket analysis'
    ],
    correctAnswer: 'A density-based outlier detection algorithm that compares local density of an object against that of its k-nearest neighbors',
    explanation: 'LOF captures local outliers by comparing the local reachability density of an object to the local densities of its neighbors; a ratio substantially below 1 indicates an outlier.'
  },

  // --- TOPIC 12: Model Evaluation & Metrics (72-90) ---
  {
    id: 72,
    topic: 'Model Evaluation',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What are the four components of a binary Confusion Matrix?',
    options: [
      'True Positives (TP), True Negatives (TN), False Positives (FP), False Negatives (FN)',
      'High, Medium, Low, None',
      'Precision, Recall, Accuracy, Error',
      'Mean, Median, Mode, Variance'
    ],
    correctAnswer: 'True Positives (TP), True Negatives (TN), False Positives (FP), False Negatives (FN)',
    explanation: 'A confusion matrix cross-tabulates actual vs. predicted labels into TP (correct positive), TN (correct negative), FP (Type I error), and FN (Type II error).'
  },
  {
    id: 73,
    topic: 'Model Evaluation',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What is the formula for Classification Accuracy?',
    options: [
      '(TP + TN) / (TP + TN + FP + FN)',
      'TP / (TP + FP)',
      'TP / (TP + FN)',
      '(2 * Precision * Recall) / (Precision + Recall)'
    ],
    correctAnswer: '(TP + TN) / (TP + TN + FP + FN)',
    explanation: 'Accuracy is the proportion of total correct predictions (both positive and negative) over the entire sample size.'
  },
  {
    id: 74,
    topic: 'Model Evaluation',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'Why can Accuracy be a misleading evaluation metric for highly imbalanced datasets (e.g., 99% negative, 1% fraud)?',
    options: [
      'A naive model predicting all negatives achieves 99% accuracy while detecting zero actual fraud cases',
      'Accuracy cannot be calculated when classes are unequal',
      'Accuracy always produces negative numbers on imbalanced data',
      'Imbalanced datasets cause floating-point arithmetic overflow'
    ],
    correctAnswer: 'A naive model predicting all negatives achieves 99% accuracy while detecting zero actual fraud cases',
    explanation: 'In class imbalance, a majority-class baseline achieves superficially high accuracy while completely failing to detect the minority class of interest.'
  },
  {
    id: 75,
    topic: 'Model Evaluation',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the formula for "Precision"?',
    options: [
      'TP / (TP + FP)',
      'TP / (TP + FN)',
      'TN / (TN + FP)',
      'FP / (TP + FP)'
    ],
    correctAnswer: 'TP / (TP + FP)',
    explanation: 'Precision measures the proportion of predicted positive cases that were genuinely positive: Precision = TP / (TP + FP).'
  },
  {
    id: 76,
    topic: 'Model Evaluation',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the formula for "Recall" (also known as Sensitivity or True Positive Rate)?',
    options: [
      'TP / (TP + FN)',
      'TP / (TP + FP)',
      'TN / (TN + FP)',
      '(TP + TN) / Total'
    ],
    correctAnswer: 'TP / (TP + FN)',
    explanation: 'Recall measures the proportion of actual positives that were correctly captured by the model: Recall = TP / (TP + FN).'
  },
  {
    id: 77,
    topic: 'Model Evaluation',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What does the F1-Score represent?',
    options: [
      'The harmonic mean of Precision and Recall',
      'The arithmetic mean of Accuracy and Error',
      'The geometric mean of TP and TN',
      'The maximum value of the ROC area'
    ],
    correctAnswer: 'The harmonic mean of Precision and Recall',
    explanation: 'F1 = 2 * (Precision * Recall) / (Precision + Recall). The harmonic mean penalizes extreme imbalances between precision and recall.'
  },
  {
    id: 78,
    topic: 'Model Evaluation',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'In medical diagnosis for a critical illness, which metric is usually prioritized to avoid missing true patients?',
    options: ['High Recall (Sensitivity)', 'High Specificity', 'Low Support', 'High Gini index'],
    correctAnswer: 'High Recall (Sensitivity)',
    explanation: 'Missing a sick patient (False Negative) has catastrophic consequences, so medical screening models prioritize maximizing Recall.'
  },
  {
    id: 79,
    topic: 'Model Evaluation',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'In an ROC (Receiver Operating Characteristic) curve, what are the axes plotted against each other?',
    options: [
      'True Positive Rate (Recall) on Y-axis vs. False Positive Rate (1 - Specificity) on X-axis',
      'Precision on Y-axis vs. Recall on X-axis',
      'Accuracy on Y-axis vs. Error Rate on X-axis',
      'Support on Y-axis vs. Confidence on X-axis'
    ],
    correctAnswer: 'True Positive Rate (Recall) on Y-axis vs. False Positive Rate (1 - Specificity) on X-axis',
    explanation: 'An ROC curve plots TPR (True Positive Rate) against FPR (False Positive Rate) across various classification threshold settings.'
  },
  {
    id: 80,
    topic: 'Model Evaluation',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What does an AUC (Area Under the ROC Curve) of 0.5 represent?',
    options: [
      'A performance level no better than random guessing',
      'A perfect classifier with zero error',
      'A model with 100% precision and 50% recall',
      'A classifier trained on completely unnormalized data'
    ],
    correctAnswer: 'A performance level no better than random guessing',
    explanation: 'An AUC of 0.5 corresponds to the diagonal line of no discrimination, equivalent to flipping an unbiased coin (random guess). An ideal classifier has AUC = 1.0.'
  },
  {
    id: 81,
    topic: 'Model Evaluation',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'In k-fold cross-validation, how is the dataset divided and evaluated?',
    options: [
      'Data is split into k equal subsets; each fold serves as test data once while the remaining k-1 folds train the model',
      'Data is duplicated k times to increase sample size',
      'Only k randomly selected rows are evaluated',
      'Model training is stopped after k epochs'
    ],
    correctAnswer: 'Data is split into k equal subsets; each fold serves as test data once while the remaining k-1 folds train the model',
    explanation: 'In k-fold cross-validation, the dataset is partitioned into k mutually exclusive subsets; the process iterates k times so every instance is tested exactly once.'
  },

  // --- TOPIC 13: Advanced Warehousing & Mining Topics (82-120) ---
  {
    id: 82,
    topic: 'Data Warehousing Fundamentals',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is a "Junk Dimension" in dimensional modeling?',
    options: [
      'A dimension combining miscellaneous low-cardinality flags and indicators to avoid multiple tiny dimension tables',
      'A corrupt table scheduled for automated purging',
      'A temporary backup copy of raw CSV records',
      'A fact table that has failed foreign key integrity checks'
    ],
    correctAnswer: 'A dimension combining miscellaneous low-cardinality flags and indicators to avoid multiple tiny dimension tables',
    explanation: 'Kimball defines a junk dimension as a convenient grouping of abstract status codes, flags, and miscellaneous indicators into a single unified table.'
  },
  {
    id: 83,
    topic: 'Data Warehousing Fundamentals',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is a "Degenerate Dimension"?',
    options: [
      'A dimension identifier (like Invoice Number or Order Number) stored directly in the fact table without its own dimension table',
      'A dimension containing outdated customer addresses',
      'A dimension with negative key values',
      'A dimension table with zero foreign keys'
    ],
    correctAnswer: 'A dimension identifier (like Invoice Number or Order Number) stored directly in the fact table without its own dimension table',
    explanation: 'Degenerate dimensions (e.g., invoice number, transaction ID, bill of lading) reside directly in the fact table because they lack additional descriptive attributes.'
  },
  {
    id: 84,
    topic: 'Data Warehouse Architecture',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the primary difference between Bill Inmon\'s and Ralph Kimball\'s approaches to data warehousing?',
    options: [
      'Inmon advocates top-down enterprise normalized EDW; Kimball advocates bottom-up dimensional data marts',
      'Inmon advocates NoSQL; Kimball advocates purely relational OLTP',
      'Inmon forbids SQL queries; Kimball forbids ETL tools',
      'There is no architectural difference between their methodologies'
    ],
    correctAnswer: 'Inmon advocates top-down enterprise normalized EDW; Kimball advocates bottom-up dimensional data marts',
    explanation: 'Inmon champions the Corporate Information Factory (top-down 3NF normalized EDW feeding data marts), while Kimball champions dimensional modeling (bottom-up conformed business process marts).'
  },
  {
    id: 85,
    topic: 'Data Cubes & OLAP Operations',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is the difference between distributive and holistic aggregate functions in data cubes?',
    options: [
      'Distributive functions (like SUM, COUNT) can be computed from sub-aggregates; holistic functions (like MEDIAN, MODE) cannot',
      'Distributive functions require neural networks; holistic functions run on GPUs',
      'Holistic functions only operate on binary columns',
      'Distributive functions return strings while holistic functions return numbers'
    ],
    correctAnswer: 'Distributive functions (like SUM, COUNT) can be computed from sub-aggregates; holistic functions (like MEDIAN, MODE) cannot',
    explanation: 'Distributive measures (SUM, MIN, MAX) partition cleanly into sub-aggregations. Holistic measures (MEDIAN, MODE, RANK) require the entire raw distribution and cannot be computed from partial summaries alone.'
  },
  {
    id: 86,
    topic: 'Data Preprocessing',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is "Data Discretization"?',
    options: [
      'Transforming continuous numeric attributes into categorical intervals or nominal concepts',
      'Deleting duplicate rows from a fact table',
      'Replacing string text with encrypted tokens',
      'Exporting database tables into JSON arrays'
    ],
    correctAnswer: 'Transforming continuous numeric attributes into categorical intervals or nominal concepts',
    explanation: 'Discretization maps continuous numeric ranges into finite categorical intervals (e.g., Age mapped to Child, Youth, Adult, Senior).'
  },
  {
    id: 87,
    topic: 'Data Preprocessing',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'In ChiMerge discretization, how are adjacent intervals evaluated for potential merging?',
    options: [
      'Using the Chi-square (chi^2) statistic to test whether class distributions of adjacent intervals are significantly different',
      'Using the arithmetic difference of their midpoints',
      'Using the Pearson correlation coefficient with target price',
      'Using Euclidean distance between interval endpoints'
    ],
    correctAnswer: 'Using the Chi-square (chi^2) statistic to test whether class distributions of adjacent intervals are significantly different',
    explanation: 'ChiMerge is a bottom-up supervised discretization method that recursively merges intervals with the lowest chi-square values (indicating similar class relative frequencies).'
  },
  {
    id: 88,
    topic: 'Data Mining Concepts',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'Which of the following is an example of "Web Structure Mining"?',
    options: [
      'Analyzing hyperlinks between web pages (e.g., Google PageRank, HITS algorithm)',
      'Extracting keywords from HTML blog posts',
      'Tracking server access log files and user clickstreams',
      'Compressing JPEG images on website homepages'
    ],
    correctAnswer: 'Analyzing hyperlinks between web pages (e.g., Google PageRank, HITS algorithm)',
    explanation: 'Web structure mining discovers knowledge from the hyperlink graph connecting documents. Web content mining mines text/multimedia; web usage mining mines server clickstream logs.'
  },
  {
    id: 89,
    topic: 'Data Mining Concepts',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is "Text Mining" (text data mining)?',
    options: [
      'Discovering meaningful patterns and insights from unstructured textual documents',
      'Converting relational tables into CSV plain text',
      'Finding spelling errors in source code comments',
      'Counting the number of characters in a database column'
    ],
    correctAnswer: 'Discovering meaningful patterns and insights from unstructured textual documents',
    explanation: 'Text mining applies NLP and data mining techniques to derive high-quality actionable insights from unstructured or semi-structured text.'
  },
  {
    id: 90,
    topic: 'Classification: Naive Bayes',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is Bayes\' Theorem formula for computing posterior probability P(C | X)?',
    options: [
      'P(C | X) = [P(X | C) * P(C)] / P(X)',
      'P(C | X) = P(X | C) + P(C) - P(X)',
      'P(C | X) = P(X) / [P(C) * P(X | C)]',
      'P(C | X) = P(X | C) * P(X)'
    ],
    correctAnswer: 'P(C | X) = [P(X | C) * P(C)] / P(X)',
    explanation: 'Bayes\' Theorem calculates posterior probability P(C|X) as Likelihood P(X|C) multiplied by Prior P(C), divided by Evidence P(X).'
  },
  {
    id: 91,
    topic: 'Classification & Decision Trees',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is "Overfitting" in classification model training?',
    options: [
      'A model performs exceptionally on training data but generalizes poorly to unseen test data',
      'A model runs out of RAM during gradient descent',
      'A tree has fewer leaf nodes than classes',
      'A dataset contains too many target classes'
    ],
    correctAnswer: 'A model performs exceptionally on training data but generalizes poorly to unseen test data',
    explanation: 'Overfitting occurs when a model captures random noise and idiosyncratic fluctuations in the training set rather than the underlying general trend.'
  },
  {
    id: 92,
    topic: 'Classification & Decision Trees',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is "Underfitting" in predictive modeling?',
    options: [
      'A model is too simple to capture the underlying structure and performs poorly on both training and test data',
      'A model with 100% test accuracy',
      'A model whose tree depth exceeds 50 levels',
      'A dataset with zero missing values'
    ],
    correctAnswer: 'A model is too simple to capture the underlying structure and performs poorly on both training and test data',
    explanation: 'Underfitting happens when a model lacks adequate capacity or features to learn the true patterns, yielding high bias and poor performance on both sets.'
  },
  {
    id: 93,
    topic: 'Association Rules',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'For a dataset with 4 items {A, B, C, D}, how many non-empty candidate itemsets exist?',
    options: ['15 (2^4 - 1)', '16 (2^4)', '24 (4!)', '10'],
    correctAnswer: '15 (2^4 - 1)',
    explanation: 'The power set of 4 items contains 2^4 = 16 subsets. Excluding the empty set yields 2^4 - 1 = 15 candidate itemsets.'
  },
  {
    id: 94,
    topic: 'Association Rules',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the definition of "Multilevel Association Rules"?',
    options: [
      'Rules that involve items at different levels of a concept hierarchy (e.g., Computer -> Laptop)',
      'Rules generated across multiple relational databases in different countries',
      'Rules evaluated with multiple confidence thresholds simultaneously',
      'Rules that require deep convolutional neural networks'
    ],
    correctAnswer: 'Rules that involve items at different levels of a concept hierarchy (e.g., Computer -> Laptop)',
    explanation: 'Multilevel association rules discover associations across various levels of taxonomic abstraction (e.g., Dairy -> Skim Milk).'
  },
  {
    id: 95,
    topic: 'Clustering',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'Which of the following distance metrics is defined as the sum of absolute differences between coordinate components (L1 norm)?',
    options: ['Manhattan distance', 'Euclidean distance', 'Chebyshev distance', 'Cosine distance'],
    correctAnswer: 'Manhattan distance',
    explanation: 'Manhattan distance (city-block distance, L1 norm) is d(x,y) = sum(|x_i - y_i|).'
  },
  {
    id: 96,
    topic: 'Clustering',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What is the standard Euclidean distance (L2 norm) formula between two 2D points (x1, y1) and (x2, y2)?',
    options: [
      'sqrt((x1 - x2)^2 + (y1 - y2)^2)',
      '|x1 - x2| + |y1 - y2|',
      'max(|x1 - x2|, |y1 - y2|)',
      '(x1 * x2) + (y1 * y2)'
    ],
    correctAnswer: 'sqrt((x1 - x2)^2 + (y1 - y2)^2)',
    explanation: 'Euclidean distance computes the straight-line geometric distance between two points using the square root of sum of squared differences.'
  },
  {
    id: 97,
    topic: 'Clustering: K-Means',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'How does the K-Means++ algorithm improve upon standard random initialization in K-Means?',
    options: [
      'It selects initial cluster centers with probability proportional to their squared distance from nearest existing center',
      'It initializes all centers at the global origin (0,0)',
      'It runs standard hierarchical clustering on all 1,000,000 rows first',
      'It assigns centers strictly to the edges of the bounding box'
    ],
    correctAnswer: 'It selects initial cluster centers with probability proportional to their squared distance from nearest existing center',
    explanation: 'K-Means++ spaces out initial seeds by sampling points proportional to D(x)^2, dramatically speeding convergence and avoiding bad local optima.'
  },
  {
    id: 98,
    topic: 'Density-Based Clustering',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'In DBSCAN, what is a "Border Point"?',
    options: [
      'A point that is not a core point, but falls within the Eps-neighborhood of a core point',
      'A point with zero neighbors within distance Eps',
      'A point that lies on the coordinate axis',
      'A point that was generated by a sensor malfunction'
    ],
    correctAnswer: 'A point that is not a core point, but falls within the Eps-neighborhood of a core point',
    explanation: 'Border points have fewer than MinPts neighbors themselves, but reside within the neighborhood of a core point, placing them on the boundary of a cluster.'
  },
  {
    id: 99,
    topic: 'Model Evaluation',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is the difference between Type I Error and Type II Error in hypothesis testing and classification?',
    options: [
      'Type I is a False Positive (rejecting true null); Type II is a False Negative (failing to reject false null)',
      'Type I is a False Negative; Type II is a False Positive',
      'Type I occurs in training; Type II occurs in testing',
      'Type I error applies only to linear regression models'
    ],
    correctAnswer: 'Type I is a False Positive (rejecting true null); Type II is a False Negative (failing to reject false null)',
    explanation: 'Type I error is a False Alarm (False Positive), while Type II error is a Miss (False Negative).'
  },
  {
    id: 100,
    topic: 'Model Evaluation',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is "Specificity" (True Negative Rate) in binary classification metrics?',
    options: [
      'TN / (TN + FP)',
      'TP / (TP + FN)',
      'TN / (TN + FN)',
      'FP / (TN + FP)'
    ],
    correctAnswer: 'TN / (TN + FP)',
    explanation: 'Specificity measures the proportion of actual negative instances that are correctly identified as negative: Specificity = TN / (TN + FP).'
  },

  // --- TOPIC 14: Conceptual & Application DWDM Questions (101-160) ---
  {
    id: 101,
    topic: 'Data Preprocessing',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What does the term "Data Scrubbing" refer to in data cleaning?',
    options: [
      'Using domain knowledge and parsing rules to detect and correct typographical errors, invalid formats, and duplicates',
      'Physically demagnetizing old computer hard drives',
      'Formatting disk partitions before installing Linux',
      'Compressing backup files with gzip'
    ],
    correctAnswer: 'Using domain knowledge and parsing rules to detect and correct typographical errors, invalid formats, and duplicates',
    explanation: 'Data scrubbing applies programmatic validation checks, rule-based matching, and fuzzy parsing to fix anomalies and normalize formats.'
  },
  {
    id: 102,
    topic: 'Data Warehouse Architecture',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is a "Data Cube"?',
    options: [
      'A multidimensional data model that allows viewing data across multiple dimensions with pre-aggregated measures',
      'A physical six-sided metal hard disk casing',
      'A blockchain storage block designed for banking logs',
      'A relational view restricted to exactly 3 tables'
    ],
    correctAnswer: 'A multidimensional data model that allows viewing data across multiple dimensions with pre-aggregated measures',
    explanation: 'A data cube is a multidimensional data structure that aggregates numerical measures over multiple dimension hierarchies (dimensions n >= 3).'
  },
  {
    id: 103,
    topic: 'Data Warehouse Schemas',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'Which of the following is typically a Dimension Table rather than a Fact Table?',
    options: ['Customer_Dimension', 'Daily_Sales_Fact', 'Store_Inventory_Fact', 'Monthly_Web_Clicks_Fact'],
    correctAnswer: 'Customer_Dimension',
    explanation: 'Customer_Dimension contains descriptive textual attributes (Name, Address, Demographic), while Fact tables contain quantifiable numeric measures.'
  },
  {
    id: 104,
    topic: 'Data Warehouse Schemas',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'In dimensional design, what is the "Granularity" (or Grain) of a fact table?',
    options: [
      'The exact level of detail or atomic event represented by a single row in the fact table',
      'The physical megabyte size of the database index',
      'The number of CPU cores running the SQL engine',
      'The speed of data transfer across Ethernet cables'
    ],
    correctAnswer: 'The exact level of detail or atomic event represented by a single row in the fact table',
    explanation: 'The grain is the fundamental business definition of what a single record in the fact table represents (e.g., individual item on a cash register receipt).'
  },
  {
    id: 105,
    topic: 'Data Preprocessing',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is Decimal Scaling normalization?',
    options: [
      'Normalizing by moving the decimal point of values by dividing by 10^j, where j is the smallest integer such that Max(|v\'|) < 1',
      'Converting all decimal numbers into integers by rounding down',
      'Dividing every number by the total number of rows in the table',
      'Multiplying all fractions by 100 to show percentages'
    ],
    correctAnswer: 'Normalizing by moving the decimal point of values by dividing by 10^j, where j is the smallest integer such that Max(|v\'|) < 1',
    explanation: 'Decimal scaling shifts the decimal point by dividing by 10^j so that the absolute value of the maximum scaled value is strictly less than 1.'
  },
  {
    id: 106,
    topic: 'Data Reduction',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'Which data reduction technique replaces original data with alternative, smaller representations such as parametric regression models?',
    options: ['Numerosity Reduction', 'Data Cleansing', 'OLAP Slicing', 'Attribute Duplication'],
    correctAnswer: 'Numerosity Reduction',
    explanation: 'Numerosity reduction reduces data volume by choosing alternative, smaller representations, using parametric models (regression, log-linear) or non-parametric methods (histograms, clustering).'
  },
  {
    id: 107,
    topic: 'Data Preprocessing',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What is "Data Integration" in data warehousing preprocessing?',
    options: [
      'Combining data from multiple heterogeneous sources into a coherent, unified data store',
      'Writing automated tests in JavaScript',
      'Deleting all historical logs older than 30 days',
      'Encrypting data transmitted across SSL sockets'
    ],
    correctAnswer: 'Combining data from multiple heterogeneous sources into a coherent, unified data store',
    explanation: 'Data integration merges schema entities, aligns naming conflicts, removes redundant attributes, and resolves value discrepancies across disparate sources.'
  },
  {
    id: 108,
    topic: 'Classification & Decision Trees',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'How does Post-Pruning evaluate whether removing a branch is beneficial?',
    options: [
      'By evaluating classification error on a separate validation set before and after pruning the branch',
      'By counting the number of characters in attribute names',
      'By checking whether the tree depth is an even number',
      'By measuring the physical file size of the Python script'
    ],
    correctAnswer: 'By evaluating classification error on a separate validation set before and after pruning the branch',
    explanation: 'Post-pruning allows the tree to grow fully, then uses a cost-complexity or validation set criterion to replace subtrees with leaves if general error does not increase.'
  },
  {
    id: 109,
    topic: 'Classification: Naive Bayes',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'When continuous numerical attributes are used with Naive Bayes, what assumption is typically made regarding their distribution?',
    options: [
      'Gaussian (Normal) distribution within each class',
      'Strictly Poisson distribution with lambda = 1',
      'Uniform distribution between -1 and +1',
      'Cauchy distribution with infinite variance'
    ],
    correctAnswer: 'Gaussian (Normal) distribution within each class',
    explanation: 'Gaussian Naive Bayes assumes continuous features associated with each class follow a normal (Gaussian) distribution parameterized by mean and variance.'
  },
  {
    id: 110,
    topic: 'Association Rules',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'If a store has 1,000 transactions and 200 of them contain both Milk and Bread, what is the Support of {Milk, Bread}?',
    options: ['20% (0.20)', '50% (0.50)', '5% (0.05)', '200%'],
    correctAnswer: '20% (0.20)',
    explanation: 'Support = 200 / 1000 = 0.20 or 20%.'
  },
  {
    id: 111,
    topic: 'Association Rules',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'If 200 transactions contain {Milk, Bread} and 400 transactions contain {Milk}, what is the Confidence of the rule Milk -> Bread?',
    options: ['50% (0.50)', '20% (0.20)', '80% (0.80)', '25% (0.25)'],
    correctAnswer: '50% (0.50)',
    explanation: 'Confidence = count({Milk, Bread}) / count({Milk}) = 200 / 400 = 0.50 or 50%.'
  },
  {
    id: 112,
    topic: 'Clustering',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is "Complete Linkage" in agglomerative hierarchical clustering?',
    options: [
      'The maximum distance between any single point in cluster A and any single point in cluster B',
      'The minimum distance between any single point across clusters',
      'The distance between cluster medians',
      'The total variance across both clusters'
    ],
    correctAnswer: 'The maximum distance between any single point in cluster A and any single point in cluster B',
    explanation: 'Complete linkage computes cluster proximity as the maximum distance between any pair of objects from each cluster, generating compact, spherical clusters.'
  },
  {
    id: 113,
    topic: 'Clustering',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is the Silhouette Coefficient used for in cluster validation?',
    options: [
      'Measuring how well an object lies within its cluster compared to neighboring clusters (ranging from -1 to +1)',
      'Measuring the physical memory footprint of the cluster array',
      'Calculating the execution time of K-Means in seconds',
      'Converting continuous features into categorical bins'
    ],
    correctAnswer: 'Measuring how well an object lies within its cluster compared to neighboring clusters (ranging from -1 to +1)',
    explanation: 'Silhouette analysis calculates s = (b - a) / max(a, b). Values near +1 indicate dense, well-separated clusters; values near -1 indicate incorrect assignments.'
  },
  {
    id: 114,
    topic: 'Model Evaluation',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'If TP = 80, FP = 20, FN = 10, and TN = 90, what is the Precision of the model?',
    options: ['80% (0.80)', '88.8% (0.89)', '85% (0.85)', '75% (0.75)'],
    correctAnswer: '80% (0.80)',
    explanation: 'Precision = TP / (TP + FP) = 80 / (80 + 20) = 80 / 100 = 0.80 or 80%.'
  },
  {
    id: 115,
    topic: 'Model Evaluation',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'Using TP = 80, FP = 20, FN = 10, and TN = 90, what is the Recall (Sensitivity) of the model?',
    options: ['88.9% (80/90)', '80% (80/100)', '90% (90/100)', '70% (70/100)'],
    correctAnswer: '88.9% (80/90)',
    explanation: 'Recall = TP / (TP + FN) = 80 / (80 + 10) = 80 / 90 approx 88.89%.'
  },
  {
    id: 116,
    topic: 'Model Evaluation',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'Using TP = 80, FP = 20, FN = 10, and TN = 90, what is the overall Accuracy?',
    options: ['85% (170/200)', '80% (160/200)', '90% (180/200)', '75% (150/200)'],
    correctAnswer: '85% (170/200)',
    explanation: 'Accuracy = (TP + TN) / Total = (80 + 90) / 200 = 170 / 200 = 85%.'
  },
  {
    id: 117,
    topic: 'Data Warehousing Fundamentals',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What is a "Dimension Hierarchy"?',
    options: [
      'A structured cascade of levels organizing dimensional data from coarse to granular (e.g., Year > Quarter > Month > Day)',
      'A permission hierarchy restricting database administrator access',
      'A tree structure linking foreign keys in an operational OLTP table',
      'A method for encrypting sensitive customer passwords'
    ],
    correctAnswer: 'A structured cascade of levels organizing dimensional data from coarse to granular (e.g., Year > Quarter > Month > Day)',
    explanation: 'Dimension hierarchies provide paths for drilling down and rolling up along concept levels (e.g., Country > State > City > Store).'
  },
  {
    id: 118,
    topic: 'Data Preprocessing',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the "Curse of Dimensionality" in data mining?',
    options: [
      'As the number of dimensions increases, data becomes exponentially sparse, making distance metrics less discriminative',
      'Databases crash whenever a table has more than 5 columns',
      'All dimensions must be multiplied together causing CPU memory leaks',
      'The requirement to store data strictly on optical media'
    ],
    correctAnswer: 'As the number of dimensions increases, data becomes exponentially sparse, making distance metrics less discriminative',
    explanation: 'In high-dimensional spaces, volume grows exponentially; data points become equidistant from one another, severely undermining distance-based mining algorithms.'
  },
  {
    id: 119,
    topic: 'Data Mining Concepts',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'Which of the following is an industry standard methodology outlining the stages of a data mining project?',
    options: ['CRISP-DM', 'HTTP/2', 'IEEE 802.11', 'TCP/IP'],
    correctAnswer: 'CRISP-DM',
    explanation: 'CRISP-DM (Cross-Industry Standard Process for Data Mining) outlines 6 phases: Business Understanding, Data Understanding, Data Preparation, Modeling, Evaluation, and Deployment.'
  },
  {
    id: 120,
    topic: 'Classification & Decision Trees',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What happens when a node in a decision tree has an Entropy of 0.0?',
    options: [
      'The node is completely pure; all sample instances belong to the exact same class',
      'The node has 50% positive and 50% negative samples',
      'The algorithm encountered a fatal mathematical error',
      'The node contains only missing values'
    ],
    correctAnswer: 'The node is completely pure; all sample instances belong to the exact same class',
    explanation: 'Entropy is 0 when all examples in the partition belong to a single class (maximum purity); splitting stops and a leaf node is formed.'
  },

  // --- TOPIC 15: Core & Syllabus-Expanding Questions (121-165) ---
  {
    id: 121,
    topic: 'Data Warehouse Architecture',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'In an ETL architecture, what is "ELT" (Extract, Load, Transform) and when is it preferred?',
    options: [
      'Data is loaded raw into target cloud data warehouses first, leveraging modern distributed MPP compute for transformation',
      'Data is transformed in memory on user laptops before loading to disk',
      'Data transformations are permanently eliminated from the pipeline',
      'A legacy mainframe batch loading protocol'
    ],
    correctAnswer: 'Data is loaded raw into target cloud data warehouses first, leveraging modern distributed MPP compute for transformation',
    explanation: 'ELT loads raw data directly into scalable cloud warehouses (BigQuery, Snowflake), utilizing MPP SQL engines for high-performance in-warehouse transformation.'
  },
  {
    id: 122,
    topic: 'Data Warehousing Fundamentals',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is a "Bridge Table" used for in dimensional modeling?',
    options: [
      'Resolving many-to-many relationships between a dimension and a fact table or multivalued dimension attributes',
      'Connecting two physically separate database servers across a WAN',
      'Replacing the central fact table in a snowflake schema',
      'Storing encrypted login tokens for business analysts'
    ],
    correctAnswer: 'Resolving many-to-many relationships between a dimension and a fact table or multivalued dimension attributes',
    explanation: 'A bridge table sits between a fact table and a dimension group to handle many-to-many relationships (e.g., patient accounts with multiple attending physicians).'
  },
  {
    id: 123,
    topic: 'OLTP vs OLAP',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What kind of database index is exceptionally well-suited for low-cardinality attributes in read-heavy data warehouse environments?',
    options: ['Bitmap Index', 'B-Tree Index', 'Hash Index', 'LSM Tree Index'],
    correctAnswer: 'Bitmap Index',
    explanation: 'Bitmap indices represent distinct attribute values as compact bit vectors (0s and 1s), enabling blazing boolean bitwise AND/OR operations on low-cardinality columns (e.g., Gender, Marital Status).'
  },
  {
    id: 124,
    topic: 'Data Warehouse Schemas',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is a "Role-Playing Dimension"?',
    options: [
      'A single physical dimension table referenced multiple times in a fact table with different business contexts',
      'A table that assigns security access roles to users',
      'A dimension table with random dummy values used in unit testing',
      'A dimension that acts as a fact table during nighttime ETL'
    ],
    correctAnswer: 'A single physical dimension table referenced multiple times in a fact table with different business contexts',
    explanation: 'A Date/Time dimension often acts in multiple roles within a single Sales fact table: Order Date, Ship Date, and Delivery Date.'
  },
  {
    id: 125,
    topic: 'Data Preprocessing',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is "Equal-Width Binning" in discretization?',
    options: [
      'Dividing the range [min, max] into N intervals of identical width: width = (max - min) / N',
      'Assigning an equal number of records into each bin',
      'Assigning bins based on decision tree class entropy',
      'Merging intervals based on chi-square statistics'
    ],
    correctAnswer: 'Dividing the range [min, max] into N intervals of identical width: width = (max - min) / N',
    explanation: 'Equal-width binning partitions the span of an attribute into N intervals of uniform size regardless of frequency distribution.'
  },
  {
    id: 126,
    topic: 'Data Preprocessing',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is "Equal-Frequency Binning" (Equal-Depth Binning)?',
    options: [
      'Dividing data so that each bin contains approximately the same number of data samples',
      'Dividing the attribute span into equal mathematical lengths',
      'Creating bins where every interval has zero variance',
      'Grouping data points by equal text length'
    ],
    correctAnswer: 'Dividing data so that each bin contains approximately the same number of data samples',
    explanation: 'Equal-frequency partitioning divides sorted data so each bucket holds roughly the same number of observations, mitigating sensitivity to skewed distributions.'
  },
  {
    id: 127,
    topic: 'Data Reduction',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'In Discrete Wavelet Transform (DWT), how is data signal reduction achieved?',
    options: [
      'By decomposing a data vector into wavelet coefficients and retaining only strongest coefficients while discarding small ones',
      'By converting all numbers into prime factors',
      'By replacing the entire table with a single linear equation',
      'By truncating string text after 10 characters'
    ],
    correctAnswer: 'By decomposing a data vector into wavelet coefficients and retaining only strongest coefficients while discarding small ones',
    explanation: 'DWT transforms a signal into detail and approximation coefficients; thresholding small coefficients provides lossy compression preserving key signal traits.'
  },
  {
    id: 128,
    topic: 'Classification & Decision Trees',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is the "Gini Gain" (reduction in impurity) when a dataset D is split by attribute A?',
    options: [
      'Gini(D) - Gini_A(D)',
      'Gini_A(D) / Gini(D)',
      'Gini(D) * Gini_A(D)',
      '1 - Gini(D)'
    ],
    correctAnswer: 'Gini(D) - Gini_A(D)',
    explanation: 'The attribute that provides the maximum reduction in impurity (Gini Gain = Gini(D) - Gini_A(D)) is chosen as the splitting criterion in CART.'
  },
  {
    id: 129,
    topic: 'Classification: Naive Bayes',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'In a document classification task with Naive Bayes, which model variant represents word counts (frequencies) rather than binary presence/absence?',
    options: ['Multinomial Naive Bayes', 'Bernoulli Naive Bayes', 'Gaussian Naive Bayes', 'Complement Naive Bayes'],
    correctAnswer: 'Multinomial Naive Bayes',
    explanation: 'Multinomial Naive Bayes models feature vectors representing discrete word counts or TF-IDF weights, while Bernoulli Naive Bayes models binary presence/absence.'
  },
  {
    id: 130,
    topic: 'Association Rules',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'If Support(A) = 0.4, Support(B) = 0.5, and Support(A U B) = 0.2, what is the Lift of the rule A -> B?',
    options: ['1.0 (Independent)', '2.0 (Positively correlated)', '0.5 (Negatively correlated)', '0.1'],
    correctAnswer: '1.0 (Independent)',
    explanation: 'Confidence(A -> B) = 0.2 / 0.4 = 0.5. Lift = Confidence / Support(B) = 0.5 / 0.5 = 1.0, showing that A and B occur together purely by chance.'
  },
  {
    id: 131,
    topic: 'Association Rules',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'In the FP-Growth algorithm, what is a "Conditional Pattern Base"?',
    options: [
      'A sub-database consisting of the set of prefix paths in the FP-tree co-occurring with a suffix pattern',
      'The list of all infrequent single items',
      'A SQL view used to store candidate pairs',
      'The root node of the initial tree'
    ],
    correctAnswer: 'A sub-database consisting of the set of prefix paths in the FP-tree co-occurring with a suffix pattern',
    explanation: 'For a given item suffix, its conditional pattern base collects all prefix paths leading to that item in the FP-tree, used to recursively construct conditional FP-trees.'
  },
  {
    id: 132,
    topic: 'Clustering: K-Means',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What objective cost function does standard K-Means aim to minimize?',
    options: [
      'Sum of Squared Errors (SSE) / Within-Cluster Sum of Squares (WCSS)',
      'Maximum Manhattan distance between cluster centroids',
      'Total number of unassigned outlier points',
      'Shannon entropy of class labels'
    ],
    correctAnswer: 'Sum of Squared Errors (SSE) / Within-Cluster Sum of Squares (WCSS)',
    explanation: 'K-Means optimizes SSE = sum_k sum_{x in C_k} ||x - mu_k||^2, iteratively minimizing squared Euclidean distances to assigned centroids.'
  },
  {
    id: 133,
    topic: 'Clustering',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'Which linkage criterion in hierarchical clustering minimizes the total within-cluster variance when two clusters are merged?',
    options: ['Ward\'s Method', 'Single Linkage', 'Complete Linkage', 'Average Linkage'],
    correctAnswer: 'Ward\'s Method',
    explanation: 'Ward\'s minimum variance method selects the pair of clusters to merge that minimizes the increase in total within-cluster sum of squared errors.'
  },
  {
    id: 134,
    topic: 'Density-Based Clustering',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'In DBSCAN, what happens to points that are neither core points nor border points?',
    options: [
      'They are classified as Noise (Outliers)',
      'They are automatically designated as cluster centroids',
      'They are deleted from the database file',
      'They are merged into a single pseudo-cluster called Cluster 0'
    ],
    correctAnswer: 'They are classified as Noise (Outliers)',
    explanation: 'Points that fail to satisfy either core point criteria or border point reachability conditions are classified as noise (anomalies/outliers).'
  },
  {
    id: 135,
    topic: 'Outlier Analysis',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'Which statistical test identifies outliers in a univariate dataset by measuring extreme standardized deviations from the mean?',
    options: ['Grubbs\' Test', 'Apriori Test', 'Chi-Square Test', 'DBSCAN Test'],
    correctAnswer: 'Grubbs\' Test',
    explanation: 'Grubbs\' test detects a single outlier in a univariate dataset that follows an approximately normal distribution by testing the maximum deviation |x - mean| / s.'
  },
  {
    id: 136,
    topic: 'Model Evaluation',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is the "Confusion Matrix" for a multi-class classification problem with N classes?',
    options: [
      'An N x N matrix comparing actual classes in rows against predicted classes in columns',
      'A binary 2x2 table ignoring classes beyond 2',
      'A list of N execution times',
      'A 1 x N vector of error percentages'
    ],
    correctAnswer: 'An N x N matrix comparing actual classes in rows against predicted classes in columns',
    explanation: 'For N classes, the confusion matrix is an N x N grid where element (i, j) indicates instances of actual class i predicted as class j.'
  },
  {
    id: 137,
    topic: 'Model Evaluation',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is "Stratified K-Fold Cross-Validation"?',
    options: [
      'A cross-validation variation ensuring each fold contains approximately the same percentage of each target class as the complete dataset',
      'A method where each fold is trained on a different computer architecture',
      'A validation technique that sorts all samples alphabetically',
      'A technique where test folds are never rotated'
    ],
    correctAnswer: 'A cross-validation variation ensuring each fold contains approximately the same percentage of each target class as the complete dataset',
    explanation: 'Stratification preserves target class proportions in every train/test split, essential for imbalanced classification scenarios.'
  },
  {
    id: 138,
    topic: 'Model Evaluation',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is the trade-off described by the "Bias-Variance Dilemma" in machine learning models?',
    options: [
      'High bias models suffer from underfitting; high variance models suffer from overfitting to training data',
      'High bias models consume too much RAM; high variance models run too slowly',
      'High bias implies high accuracy; high variance implies low error',
      'It only applies to unsupervised k-means clustering'
    ],
    correctAnswer: 'High bias models suffer from underfitting; high variance models suffer from overfitting to training data',
    explanation: 'Bias is error from overly simplistic assumptions (underfitting); variance is error from sensitivity to small training variations (overfitting). Minimizing both requires tuning model complexity.'
  },
  {
    id: 139,
    topic: 'Data Preprocessing',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'What is a "Dummy Variable" (One-Hot Encoding) in feature engineering?',
    options: [
      'Converting a categorical attribute with k categories into k binary (0/1) indicator columns',
      'A placeholder variable containing null values',
      'A variable used strictly for SQL comments',
      'A column that was deleted during normalization'
    ],
    correctAnswer: 'Converting a categorical attribute with k categories into k binary (0/1) indicator columns',
    explanation: 'One-hot encoding transforms categorical variables into binary flags (e.g., Color [Red, Blue] becomes Color_Red [1,0] and Color_Blue [0,1]).'
  },
  {
    id: 140,
    topic: 'Data Preprocessing',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is the purpose of Data Aggregation in data reduction?',
    options: [
      'Combining multiple records into a single summary measure to reduce storage size while preserving high-level trends',
      'Splitting single numbers into decimal components',
      'Converting all strings to uppercase letters',
      'Adding random noise to test algorithm resilience'
    ],
    correctAnswer: 'Combining multiple records into a single summary measure to reduce storage size while preserving high-level trends',
    explanation: 'Data aggregation collapses fine-grained data (e.g., daily sales by store) into coarser summaries (e.g., monthly sales by region), shrinking dataset volume significantly.'
  },
  {
    id: 141,
    topic: 'Data Warehouse Architecture',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is an "Operational Data Store" (ODS)?',
    options: [
      'An integrated, current-valued database used for operational reporting before data is permanently archived into an EDW',
      'A backup tape archive storing 10-year-old financial logs',
      'A frontend visualization tool like Tableau or PowerBI',
      'A raw log file saved on an IoT sensor'
    ],
    correctAnswer: 'An integrated, current-valued database used for operational reporting before data is permanently archived into an EDW',
    explanation: 'An ODS integrates operational data from disparate sources, offering low-latency, current-state operational reporting prior to long-term warehouse loading.'
  },
  {
    id: 142,
    topic: 'Data Warehousing Fundamentals',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is "Data Cube Materialization"?',
    options: [
      'Pre-computing and physically storing cuboid aggregations on disk to achieve instantaneous OLAP query response',
      'Converting digital data onto paper printouts',
      'Deleting all base transaction tables',
      'Exporting cubes to 3D virtual reality headsets'
    ],
    correctAnswer: 'Pre-computing and physically storing cuboid aggregations on disk to achieve instantaneous OLAP query response',
    explanation: 'Cube materialization pre-computes cuboids (full materialization computes all 2^n; partial materialization computes frequently queried cuboids) to balance query speed and disk usage.'
  },
  {
    id: 143,
    topic: 'Classification & Decision Trees',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'In Ensemble Learning, what distinguishes "Bagging" (e.g., Random Forests) from "Boosting" (e.g., AdaBoost)?',
    options: [
      'Bagging trains models in parallel on bootstrap samples; Boosting trains models sequentially, adjusting weights based on previous errors',
      'Bagging uses only neural networks; Boosting uses only linear regression',
      'Bagging is supervised; Boosting is completely unsupervised',
      'Bagging requires normalized data; Boosting requires unnormalized text'
    ],
    correctAnswer: 'Bagging trains models in parallel on bootstrap samples; Boosting trains models sequentially, adjusting weights based on previous errors',
    explanation: 'Bagging (Bootstrap Aggregating) trains models independently in parallel to reduce variance. Boosting trains models sequentially, focusing on misclassified instances to reduce bias.'
  },
  {
    id: 144,
    topic: 'Association Rules',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is a "Negative Association Rule"?',
    options: [
      'A rule indicating that the presence of item A implies the absence of item B: A -> ~B',
      'A rule with negative confidence',
      'A rule derived from corrupted transaction files',
      'A rule that has zero support'
    ],
    correctAnswer: 'A rule indicating that the presence of item A implies the absence of item B: A -> ~B',
    explanation: 'Negative association rules identify negative correlations where buying product A implies a customer is unlikely to purchase product B (e.g., Tea -> Not Coffee).'
  },
  {
    id: 145,
    topic: 'Clustering',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'What is the primary advantage of DBSCAN over K-Means clustering?',
    options: [
      'DBSCAN can find arbitrarily shaped clusters and does not require pre-specifying the number of clusters',
      'DBSCAN is guaranteed to run in O(1) constant time',
      'DBSCAN assigns every single point to a cluster with zero noise',
      'DBSCAN only works on 1-dimensional datasets'
    ],
    correctAnswer: 'DBSCAN can find arbitrarily shaped clusters and does not require pre-specifying the number of clusters',
    explanation: 'K-Means assumes spherical, similarly-sized clusters and struggles with complex geometries. DBSCAN discovers non-spherical clusters of arbitrary shape and isolates noise.'
  },
  {
    id: 146,
    topic: 'Model Evaluation',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is a "Holdout Method" in model validation?',
    options: [
      'Splitting labeled data into two independent sets: a training set for model induction and a testing set for model evaluation',
      'Holding out the target label permanently from the dataset',
      'Pausing algorithm execution after 100 rows',
      'Evaluating models without any test data'
    ],
    correctAnswer: 'Splitting labeled data into two independent sets: a training set for model induction and a testing set for model evaluation',
    explanation: 'The holdout method reserves a fraction (e.g., 70% train, 30% test) to ensure the model is evaluated on data unseen during training.'
  },
  {
    id: 147,
    topic: 'Data Preprocessing',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'Which measure of central tendency is least affected by extreme outliers in a skewed numerical dataset?',
    options: ['Median', 'Mean', 'Standard deviation', 'Variance'],
    correctAnswer: 'Median',
    explanation: 'The median represents the 50th percentile (middle value) and is robust against extreme outliers, unlike the mean which is skewed by high or low values.'
  },
  {
    id: 148,
    topic: 'Data Warehousing Fundamentals',
    difficulty: 'Medium',
    type: 'mcq',
    question: 'What is "Data Cleansing" also commonly called in corporate IT parlance?',
    options: ['Data scrubbing', 'Data slicing', 'Data cubing', 'Data pivoting'],
    correctAnswer: 'Data scrubbing',
    explanation: 'Data cleansing and data scrubbing are interchangeable terms describing the detection and correction of corrupted, inaccurate, or incomplete records.'
  },
  {
    id: 149,
    topic: 'Data Warehouse Schemas',
    difficulty: 'Hard',
    type: 'mcq',
    question: 'In a Star Schema, why are query joins generally faster than in a highly normalized Snowflake Schema?',
    options: [
      'Fewer joins are required because dimensional attributes reside directly in denormalized dimension tables',
      'Fact tables in star schemas contain zero foreign keys',
      'Star schemas cannot store text strings',
      'Snowflake schemas do not support SQL SELECT statements'
    ],
    correctAnswer: 'Fewer joins are required because dimensional attributes reside directly in denormalized dimension tables',
    explanation: 'In a star schema, each dimension is a single table, requiring only a single join to the central fact table. Snowflake schemas require cascading multi-table joins across normalized hierarchy tables.'
  },
  {
    id: 150,
    topic: 'Data Mining Concepts',
    difficulty: 'Easy',
    type: 'mcq',
    question: 'Which of the following is considered an ethical and privacy risk in real-world data mining?',
    options: [
      'Unauthorized profiling and re-identification of personal health records through data linkage',
      'Reducing computer power consumption',
      'Running SQL aggregate queries on public census totals',
      'Writing automated unit tests in software engineering'
    ],
    correctAnswer: 'Unauthorized profiling and re-identification of personal health records through data linkage',
    explanation: 'Data mining poses privacy risks when anonymized datasets are linked with external records to re-identify individuals or discriminate against protected groups.'
  },

  // --- Conceptual Short-Answer / Text Validation Questions (151-160) ---
  {
    id: 151,
    topic: 'Data Warehousing Fundamentals',
    difficulty: 'Medium',
    type: 'text',
    question: 'What is the full name of the popular relational model schema characterized by a central fact table and surrounding dimension tables?',
    correctAnswer: 'Star Schema',
    explanation: 'The Star Schema resembles a star with a central fact table surrounded by single-table dimensions.'
  },
  {
    id: 152,
    topic: 'Data Preprocessing',
    difficulty: 'Easy',
    type: 'text',
    question: 'What term describes data that is erroneous, corrupted, or contains random variance in measured values?',
    correctAnswer: 'Noisy data',
    explanation: 'Noisy data contains random error or variance in measured variables, typically smoothed using binning, clustering, or regression.'
  },
  {
    id: 153,
    topic: 'Classification & Decision Trees',
    difficulty: 'Easy',
    type: 'text',
    question: 'Which terminal node in a decision tree holds the final predicted class label?',
    correctAnswer: 'Leaf node',
    explanation: 'Leaf nodes (terminal nodes) represent class predictions or probability distributions.'
  },
  {
    id: 154,
    topic: 'Association Rules',
    difficulty: 'Medium',
    type: 'text',
    question: 'In association rule mining, what metric measures the probability that item B is purchased given that item A has been purchased: P(B|A)?',
    correctAnswer: 'Confidence',
    explanation: 'Confidence(A -> B) = P(B|A) = Support(A U B) / Support(A).'
  },
  {
    id: 155,
    topic: 'Clustering',
    difficulty: 'Easy',
    type: 'text',
    question: 'What is the name of the popular partitioning clustering algorithm that takes a user-specified parameter K for the number of clusters?',
    correctAnswer: 'K-Means',
    explanation: 'K-Means partitions n observations into K clusters, each represented by the mean of points in the cluster.'
  },
  {
    id: 156,
    topic: 'Model Evaluation',
    difficulty: 'Easy',
    type: 'text',
    question: 'What is the harmonic mean of precision and recall called in classification performance evaluation?',
    correctAnswer: 'F1 Score',
    explanation: 'The F1-Score (or F-measure) balances precision and recall via their harmonic mean.'
  },
  {
    id: 157,
    topic: 'Data Warehouse Architecture',
    difficulty: 'Easy',
    type: 'text',
    question: 'What three-letter acronym represents the process of Extraction, Transformation, and Loading into a data warehouse?',
    correctAnswer: 'ETL',
    explanation: 'ETL stands for Extract, Transform, Load.'
  },
  {
    id: 158,
    topic: 'Model Evaluation',
    difficulty: 'Medium',
    type: 'text',
    question: 'What 2x2 grid cross-tabulates actual positive/negative labels against predicted positive/negative labels?',
    correctAnswer: 'Confusion Matrix',
    explanation: 'A confusion matrix displays True Positives, True Negatives, False Positives, and False Negatives.'
  },
  {
    id: 159,
    topic: 'Data Cubes & OLAP Operations',
    difficulty: 'Medium',
    type: 'text',
    question: 'Which OLAP operation navigates up a concept hierarchy (e.g., from day to month to year) to perform summarization?',
    correctAnswer: 'Roll-up',
    explanation: 'Roll-up aggregates data by climbing up a hierarchy or reducing dimensionality.'
  },
  {
    id: 160,
    topic: 'Association Rules',
    difficulty: 'Medium',
    type: 'text',
    question: 'What classic algorithmic principle states that all non-empty subsets of a frequent itemset must also be frequent?',
    correctAnswer: 'Apriori property',
    explanation: 'The Apriori property (downward closure of support) allows pruning candidate itemsets whose subsets are not frequent.'
  }
];

/**
 * Returns a randomized copy of the questions array
 */
export function getShuffledQuestions(): Question[] {
  return [...DWDM_QUESTIONS].sort(() => Math.random() - 0.5);
}
