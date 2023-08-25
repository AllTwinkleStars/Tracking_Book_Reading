from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import text

Base = declarative_base()


class BookModel(Base):
    __tablename__ = 'books'
    id = Column(Integer, primary_key=True)
    title = Column(String)
    shelves = Column(Integer)


class BookRepository:
    def __init__(self, db_url: str):
        self.engine = create_engine(db_url)
        self.Session = sessionmaker(bind=self.engine)

    def execute_raw_sql(self, sql: str, params: dict = None):
        try:
            session = self.Session()
            if params == None:
                result = session.execute(text(sql))
            else:
                result = session.execute(text(sql), params)
            session.commit()
            return result
        except SQLAlchemyError as e:
            session.rollback()
            return -1

    def fetch_raw_sql(self, sql: str, params: dict = None):
        try:
            session = self.Session()
            if params == None:
                result = session.execute(text(sql)).fetchall()
            else:
                result = session.execute(text(sql), params).fetchall()
            return result
        except SQLAlchemyError as e:
            return -1
