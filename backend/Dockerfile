FROM ruby:3.1.2

ENV LANG=C.UTF-8 \
  BUNDLE_JOBS=4 \
  BUNDLE_RETRY=3

RUN mkdir -p /shop-app/backend
WORKDIR /shop-app/backend
COPY Gemfile Gemfile.lock ./

RUN bundle install
COPY . .

ENTRYPOINT ["./docker-entrypoint.sh"]
EXPOSE 3000
CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0"]
