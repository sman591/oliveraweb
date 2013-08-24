source "https://rubygems.org"

def ruby_version(file = ".ruby-version")
  file = File.join(File.dirname(__FILE__), file)
  IO.read(file).chomp.sub(/-p.*$/, "")
end

ruby ruby_version

gem "compass-rails"
gem "bootstrap-sass"