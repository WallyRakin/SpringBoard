export const seed = `INSERT INTO Rank_permission (rank) VALUES ('admin'), ('manager'), ('employee');
INSERT INTO Employment_status (status) VALUES ('active'), ('suspended');
INSERT INTO Table_status (status) VALUES ('available'), ('occupied'), ('on-hold');
INSERT INTO Time_zone (code) VALUES ('ADT'), ('AKDT'), ('AKST'), ('AST'), ('CDT'), ('CST'), ('EDT'), ('EST'), ('HDT'), ('HST'), ('MDT'), ('MST'), ('NDT'), ('NST'), ('PDT'), ('PST');
INSERT INTO Exit_code (code, description) VALUES ('employee-exit', 'Exited by employee'), ('manager-exit', 'Exited by manager');
INSERT INTO Tab_status (status) VALUES ('open'), ('resolved');
INSERT INTO Ticket_status (status) VALUES ('in-progress'), ('completed');`

module.exports = { seed };