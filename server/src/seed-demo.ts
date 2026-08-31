import { PrismaClient, Role, HousingFormula, MatchStatus, FinancialManagementType, SleepHabit, PresencePattern } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding demo data...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Senior
  const seniorUser = await prisma.user.upsert({
    where: { email: 'senior@demo.coab.fr' },
    update: {},
    create: {
      email: 'senior@demo.coab.fr',
      passwordHash,
      role: Role.SENIOR,
      firstName: 'Jeanne',
      lastName: 'Dupont',
      phone: '0612345678',
      address: '15 rue des Lilas',
      zipCode: '75015',
      city: 'Paris',
      isVerified: true,
      seniorProfile: {
        create: {
          housingType: 'Appartement',
          roomSurface: 12.5,
          hasPets: true,
          accessibilityLevel: 'Ascenseur',
          sleepHabit: SleepHabit.EARLY_BIRD,
          presencePattern: PresencePattern.HIGH,
          isProfileComplete: true
        }
      }
    }
  });

  // 2. Create Junior
  const juniorUser = await prisma.user.upsert({
    where: { email: 'junior@demo.coab.fr' },
    update: {},
    create: {
      email: 'junior@demo.coab.fr',
      passwordHash,
      role: Role.JUNIOR,
      firstName: 'Lucas',
      lastName: 'Martin',
      phone: '0687654321',
      address: 'Résidence Universitaire',
      zipCode: '75013',
      city: 'Paris',
      isVerified: true,
      juniorProfile: {
        create: {
          situation: 'Etudiant',
          targetCities: ['Paris', 'Lyon'],
          maxBudget: 400,
          moveInDate: new Date('2026-09-01'),
          hobbies: ['Lecture', 'Cinéma'],
          sleepHabit: SleepHabit.EARLY_BIRD,
          isProfileComplete: true
        }
      }
    }
  });

  // 3. Create Volunteer
  const volunteerUser = await prisma.user.upsert({
    where: { email: 'benevole@demo.coab.fr' },
    update: {},
    create: {
      email: 'benevole@demo.coab.fr',
      passwordHash,
      role: Role.VOLUNTEER,
      firstName: 'Sophie',
      lastName: 'Lambert',
      phone: '0601020304',
      isVerified: true
    }
  });

  // 4. Create a Match
  const seniorProfile = await prisma.seniorProfile.findUnique({ where: { userId: seniorUser.id } });
  const juniorProfile = await prisma.juniorProfile.findUnique({ where: { userId: juniorUser.id } });

  if (seniorProfile && juniorProfile) {
    const existingMatch = await prisma.match.findFirst({
      where: { seniorId: seniorProfile.id, juniorId: juniorProfile.id }
    });

    if (!existingMatch) {
      const match = await prisma.match.create({
        data: {
          seniorId: seniorProfile.id,
          juniorId: juniorProfile.id,
          status: MatchStatus.ACTIVE,
          housingFormula: HousingFormula.CONVIVIALE,
          financialManagementType: FinancialManagementType.COAB_MANAGED,
          startDate: new Date('2026-09-01'),
          endDate: new Date('2027-06-30')
        }
      });

      // 5. Create a Followup for the Volunteer
      await prisma.monthlyFollowup.create({
        data: {
          matchId: match.id,
          volunteerId: volunteerUser.id,
          interviewDate: new Date('2026-10-01'),
          generalNotes: 'Première rencontre de suivi planifiée.'
        }
      });
    }
  }

  console.log('Demo data seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
