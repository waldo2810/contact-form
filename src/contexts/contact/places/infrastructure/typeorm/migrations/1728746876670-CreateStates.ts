import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStates1728746876670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO states (id, name, isoCode, countryCode, countryId) VALUES
        ('1', 'Amazonas', 'AMA', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('2', 'Antioquia', 'ANT', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('3', 'Arauca', 'ARA', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('4', 'Archipiélago de San Andrés, Providencia y Santa Catalina', 'SAP', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('5', 'Atlántico', 'ATL', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('6', 'Bogotá D.C.', 'DC', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('7', 'Bolívar', 'BOL', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('8', 'Boyacá', 'BOY', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('9', 'Caldas', 'CAL', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('10', 'Caquetá', 'CAQ', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('11', 'Casanare', 'CAS', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('12', 'Cauca', 'CAU', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('13', 'Cesar', 'CES', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('14', 'Chocó', 'CHO', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('15', 'Cundinamarca', 'CUN', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('16', 'Córdoba', 'COR', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('17', 'Guainía', 'GUA', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('18', 'Guaviare', 'GUV', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('19', 'Huila', 'HUI', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('20', 'La Guajira', 'LAG', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('21', 'Magdalena', 'MAG', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('22', 'Meta', 'MET', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('23', 'Nariño', 'NAR', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('24', 'Norte de Santander', 'NSA', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('25', 'Putumayo', 'PUT', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('26', 'Quindío', 'QUI', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('27', 'Risaralda', 'RIS', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('28', 'Santander', 'SAN', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('29', 'Sucre', 'SUC', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('30', 'Tolima', 'TOL', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('31', 'Valle del Cauca', 'VAC', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('32', 'Vaupés', 'VAU', 'co', (SELECT id FROM countries WHERE isoCode = 'co')),
        ('33', 'Vichada', 'VID', 'co', (SELECT id FROM countries WHERE isoCode = 'co'));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM countries;
    `);
  }
}
