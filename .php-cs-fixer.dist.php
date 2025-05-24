<?php

$finder = PhpCsFixer\Finder::create()
    ->in([
        __DIR__ . '/app',
        __DIR__ . '/routes',
        __DIR__ . '/database',
        __DIR__ . '/tests',
    ])
    ->name('*.php')
    ->notName('*.blade.php');

return (new PhpCsFixer\Config())

    ->setRiskyAllowed(true)
    ->setRules([
       '@PSR12' => true,
    'array_syntax' => ['syntax' => 'short'],
    'ordered_imports' => ['sort_algorithm' => 'alpha'],
    'no_unused_imports' => true,
    'blank_line_after_namespace' => true,
    'single_blank_line_at_eof' => true,
    'no_extra_blank_lines' => true,
    'binary_operator_spaces' => ['default' => 'align_single_space_minimal'],
    'phpdoc_align' => ['align' => 'left'],
    'phpdoc_scalar' => true,
    'phpdoc_summary' => false,
    'no_superfluous_phpdoc_tags' => true,
    'no_blank_lines_after_class_opening' => true,
    'method_argument_space' => ['on_multiline' => 'ensure_fully_multiline'],
    'trailing_comma_in_multiline' => ['elements' => ['arrays']],
    'cast_spaces' => ['space' => 'single'],
    'concat_space' => ['spacing' => 'one'],
    'function_typehint_space' => true,
    'lowercase_keywords' => true,
    'native_function_casing' => true,
    'not_operator_with_space' => true,
    'not_operator_with_successor_space' => true,
    'return_type_declaration' => ['space_before' => 'none'],
    'single_quote' => true,
    ])
    ->setFinder($finder);
