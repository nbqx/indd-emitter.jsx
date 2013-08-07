require 'bundler'
Bundler.require

task :default => :build

desc 'Build indd-emitter.jsx'
task :build do
  Jsx.compile "./src/indd-emitter.jsx", "./indd-emitter.jsx", {:include => ['./vendor']}
end
