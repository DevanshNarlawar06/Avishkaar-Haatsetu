"""users: email and Firebase sign in

The models gained these columns after the first migrations were written, so a
fresh database built from migrations alone was missing them and every sign in
failed with "column users.email does not exist".

Revision ID: 9847b098a858
Revises: dba1d7b190d5
Create Date: 2026-11-09 20:32:39.415403
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "9847b098a858"
down_revision: str | None = "dba1d7b190d5"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("users", sa.Column("email", sa.String(length=320), nullable=True))
    op.add_column("users", sa.Column("firebase_uid", sa.String(length=128), nullable=True))
    # A Google sign in has an email and no phone number.
    op.alter_column("users", "phone", existing_type=sa.String(length=20), nullable=True)
    op.create_index("ix_users_email", "users", ["email"], unique=False)
    op.create_index("ix_users_firebase_uid", "users", ["firebase_uid"], unique=True)


def downgrade() -> None:
    op.drop_index("ix_users_firebase_uid", table_name="users")
    op.drop_index("ix_users_email", table_name="users")
    op.alter_column("users", "phone", existing_type=sa.String(length=20), nullable=False)
    op.drop_column("users", "firebase_uid")
    op.drop_column("users", "email")
