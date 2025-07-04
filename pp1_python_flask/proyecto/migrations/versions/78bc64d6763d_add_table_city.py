"""add_table_city

Revision ID: 78bc64d6763d
Revises: 
Create Date: 2025-06-16 10:48:11.757812

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '78bc64d6763d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('city',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('lat', sa.Float(), nullable=False),
    sa.Column('long', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('city')
    # ### end Alembic commands ###
