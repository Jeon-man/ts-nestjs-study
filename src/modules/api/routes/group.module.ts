import { Module } from '@nestjs/common';

import { GroupController } from '@controller/group';
import { GroupService } from '@service';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
